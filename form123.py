import requests
import time

# Google Form action URL (replace with the actual form action URL)
form_url = 'https://forms.gle/4NMq4gubbbk97KZP9'

# Number of submissions based on percentages
total_submissions = 200
security_training_submissions = int(total_submissions * 0.375)  # 37.5% for training failure reason
cybercrime_concern_submissions = total_submissions - security_training_submissions  # 62.5% for cybercrime concern

# Example form data (replace with actual entry names)
form_data = {
    'entry.123456': 'Sample Name',  # Replace with actual field name for "Name"
    'entry.654321': 'sample@example.com',  # Replace with actual field name for "Email"
}

# Choices for the two questions
security_training_choice = 'B'  # Employees find security training unengaging (for 37.5% submissions)
cybercrime_choice = 'B'  # Rising Financial Fraud (for 62.5% submissions)

# Function to generate the form submission
def submit_form(training_issue, cybercrime_concern):
    # Set the answers based on the categories
    form_data['entry.789012'] = training_issue  # For the "Why Security Training Fails" question
    form_data['entry.345678'] = cybercrime_concern  # For the "Critical Concern" question

    response = requests.post(form_url, data=form_data)
    
    return response.status_code == 200

# Loop to submit the form for 200 responses
for i in range(total_submissions):
    # Determine which response to submit based on the index
    if i < security_training_submissions:
        # 37.5% of submissions (Employees find security training unengaging)
        training_issue = security_training_choice
        cybercrime_concern = 'A'  # Can choose any valid option (e.g., "A" for Increasing employee turnover or others)
    else:
        # 62.5% of submissions (Rising Financial Fraud)
        training_issue = 'A'  # Choose any other valid option for security training question
        cybercrime_concern = cybercrime_choice  # 'B' for Rising Financial Fraud

    # Submit the form
    if submit_form(training_issue, cybercrime_concern):
        print(f"Form submission {i+1} successful!")
    else:
        print(f"Failed to submit form {i+1}.")
    
    # Optional: Add a short delay to avoid rate limiting
    time.sleep(0.1)  # Adjust this as needed to avoid rate limiting
