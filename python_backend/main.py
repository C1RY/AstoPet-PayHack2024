import os
import imaplib
import email
from email.header import decode_header
from transformers import AutoModelForSequenceClassification, AutoTokenizer, pipeline
from flask import Flask, request, jsonify
import pandas as pd
from flask_cors import CORS  # Import CORS

# Gmail credentials
GMAIL_IMAP = "imap.gmail.com"
EMAIL = "astopet1@gmail.com"  # Your email
PASSWORD = "vixx yadu lsbr kspb"  # Your App Password

# Model configurations
MODEL_NAMES = {
    "spam_model": "bhadresh-savani/distilbert-base-uncased-emotion",  # For spam classification
    "phishing_model": "facebook/bart-large-mnli"  # For phishing detection
}

MODELS_FOLDER = "./models"
os.makedirs(MODELS_FOLDER, exist_ok=True)

# Create Flask app
app = Flask(__name__)

# Enable CORS for all routes
CORS(app)  # This will allow all domains to access your API


# Function to download and load models
def load_model(model_name):
    print(f"[INFO] Loading model: {model_name}")
    model = AutoModelForSequenceClassification.from_pretrained(model_name, cache_dir=MODELS_FOLDER)
    tokenizer = AutoTokenizer.from_pretrained(model_name, cache_dir=MODELS_FOLDER)
    return model, tokenizer

# Load models
spam_model, spam_tokenizer = load_model(MODEL_NAMES["spam_model"])
phishing_model, phishing_tokenizer = load_model(MODEL_NAMES["phishing_model"])

# Create pipelines
spam_classifier = pipeline("text-classification", model=spam_model, tokenizer=spam_tokenizer)
phishing_classifier = pipeline("zero-shot-classification", model=phishing_model, tokenizer=phishing_tokenizer)

# Categories
CATEGORIES = ["Legitimate", "Spam", "Phishing"]

# Function to classify email
def classify_email(subject, body):
    text = f"{subject} {body}"
    max_length = 512  # Model's maximum input sequence length

    # Tokenize and truncate text
    spam_inputs = spam_tokenizer(text, truncation=True, max_length=max_length, return_tensors="pt")
    
    try:
        # Spam classification
        spam_result = spam_model(**spam_inputs)
        spam_score = spam_result.logits.softmax(dim=-1).squeeze()[1].item()  # Assuming LABEL_1 is spam
        
        # Phishing classification
        phishing_result = phishing_classifier(text, candidate_labels=CATEGORIES)
        phishing_scores = {label: score for label, score in zip(phishing_result["labels"], phishing_result["scores"])}

        # Normalize scores (optional)
        spam_score_normalized = spam_score / (spam_score + phishing_scores["Spam"] + phishing_scores["Phishing"] + phishing_scores["Legitimate"])
        
        # Weighted combination of scores
        combined_scores = {
            "Legitimate": phishing_scores.get("Legitimate", 0),
            "Spam": (spam_score_normalized + phishing_scores.get("Spam", 0)) / 2,  # Average spam score
            "Phishing": phishing_scores.get("Phishing", 0)
        }

        # Final classification
        final_category = max(combined_scores, key=combined_scores.get)
        return final_category, combined_scores[final_category]

    except Exception as e:
        print(f"[ERROR] Error during classification: {e}")
        return "Unknown", 0

# Flask endpoint for classifying an email
@app.route("/classify-email", methods=["POST"])
def classify_email_endpoint():
    data = request.get_json()
    subject = data.get("subject", "")
    body = data.get("body", "")
    
    category, confidence = classify_email(subject, body)
    
    if category == "Unknown":
        return jsonify({"error": "Error during classification"}), 400
    
    return jsonify({"category": category, "confidence": confidence})

# Flask endpoint for fetching email stats
@app.route("/email-stats", methods=["GET"])
def fetch_email_stats():
    category_details = {"Legitimate": [], "Spam": [], "Phishing": []}  # Store email details for each category
    trusted_domains = ["google.com", "facebook.com", "instagram.com", "tiktok.com", "postman.com", "ngrok.com"]

    try:
        mail = imaplib.IMAP4_SSL(GMAIL_IMAP)
        mail.login(EMAIL, PASSWORD)
        print("[INFO] Connected to Gmail.")

        mail.select("inbox")
        status, messages = mail.search(None, "ALL")
        email_ids = messages[0].split()
        total_emails = len(email_ids)

        print(f"[INFO] Found {total_emails} emails.")
        MAX_EMAILS_TO_PROCESS = 50
        emails_to_process = min(total_emails, MAX_EMAILS_TO_PROCESS)

        for email_id in email_ids[:emails_to_process]:
            status, msg_data = mail.fetch(email_id, "(RFC822)")
            if status != "OK":
                print(f"[ERROR] Could not fetch email ID {email_id}. Skipping...")
                continue

            for response_part in msg_data:
                if isinstance(response_part, tuple):
                    try:
                        msg = email.message_from_bytes(response_part[1])
                        subject, encoding = decode_header(msg["Subject"])[0]
                        if isinstance(subject, bytes):
                            try:
                                subject = subject.decode(encoding or "utf-8")
                            except (UnicodeDecodeError, TypeError):
                                subject = subject.decode("latin1", errors="replace")
                        sender = msg["From"]
                        sender_domain = sender.split("@")[-1].lower()

                        # Check if sender is trusted
                        if any(trusted_domain in sender_domain for trusted_domain in trusted_domains):
                            print(f"[INFO] Skipping trusted sender: {sender}")
                            category_details["Legitimate"].append({
                                "subject": subject,
                                "sender": sender,
                                "category": "Legitimate",
                                "confidence": 1.0  # 100% legitimate confidence
                            })
                            continue

                        body = ""
                        if msg.is_multipart():
                            for part in msg.walk():
                                if part.get_content_type() == "text/plain":
                                    try:
                                        body = part.get_payload(decode=True).decode("utf-8", errors="replace")
                                    except (UnicodeDecodeError, TypeError):
                                        body = part.get_payload(decode=True).decode("latin1", errors="replace")
                                    break
                        else:
                            try:
                                body = msg.get_payload(decode=True).decode("utf-8", errors="replace")
                            except (UnicodeDecodeError, TypeError):
                                body = msg.get_payload(decode=True).decode("latin1", errors="replace")

                        category, confidence = classify_email(subject, body)

                        if category in ["Spam", "Phishing"]:
                            category_details[category].append({
                                "subject": subject,
                                "sender": sender,
                                "body": body[:200],  # Show first 200 characters of the body for preview
                                "confidence": confidence
                            })

                        print(f"[INFO] Subject: {subject}")
                        print(f"[INFO] Classification: {category} (Confidence: {confidence:.2f})")
                        print("-" * 50)

                    except Exception as e:
                        print(f"[ERROR] Failed to process email ID {email_id}. Error: {e}")

        mail.logout()
        print("[INFO] Disconnected from Gmail.")
        
        print("[INFO] Email Category Details:")
        print(category_details)

        # Return the email details as JSON
        return jsonify(category_details)

    except Exception as e:
        print(f"Error fetching email stats: {e}")
        return jsonify({"error": "Unable to fetch email stats"}), 500



# Run Flask app on port 9000
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=9000, debug=True)

