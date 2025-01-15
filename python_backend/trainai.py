import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix
import joblib
import os

# List of your CSV files (adjust paths to your actual files)
filepaths = ['DataFiles/1.Benign_list_big_final.csv', 'DataFiles/2.online-valid.csv', 
             'DataFiles/3.legitimate.csv', 'DataFiles/4.phishing.csv', 'DataFiles/5.urldata.csv']

# Step 1: Load all CSV files into a single DataFrame
dataframes = []
for filepath in filepaths:
    try:
        df = pd.read_csv(filepath)
        print(f"Loaded {filepath} with shape: {df.shape}")
        dataframes.append(df)
    except Exception as e:
        print(f"Error loading {filepath}: {e}")

# Combine all dataframes
if dataframes:
    data = pd.concat(dataframes, ignore_index=True)
    print(f"Combined dataset shape: {data.shape}")
else:
    print("No data loaded, check CSV files.")

# Step 2: Inspect the data to find the target column
print(f"Columns in the dataset: {data.columns}")
print(data.head())  # Preview the first few rows

# The target column is 'Label'
target_column = 'Label'

# Check if 'Label' exists as the target
if target_column in data.columns:
    # Inspect the target distribution
    print(f"Target value counts:\n{data[target_column].value_counts()}")
else:
    print(f"No target column named '{target_column}' found. Please verify the target column.")

# Step 3: Data Preprocessing
# Drop columns that are irrelevant, such as the first URL column
irrelevant_columns = ['http://1337x.to/torrent/1048648/American-Sniper-2014-MD-iTALiAN-DVDSCR-X264-BST-MT/', 'url']
data_cleaned = data.drop(columns=irrelevant_columns)

# Drop rows with missing values (or you can fill them if needed)
data_cleaned = data_cleaned.dropna()  # Drop rows with NaN values

# Features (X) and Target (y)
X = data_cleaned.drop(columns=[target_column])  # Features
y = data_cleaned[target_column]  # Target

# Step 4: Split the data into training and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Step 5: Feature Scaling (Optional)
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Step 6: Train a RandomForestClassifier
clf = RandomForestClassifier(n_estimators=100, random_state=42)
clf.fit(X_train_scaled, y_train)

# Step 7: Evaluate the model
y_pred = clf.predict(X_test_scaled)

# Print Classification Report
print("Classification Report:")
print(classification_report(y_test, y_pred))

# Print Confusion Matrix
print("Confusion Matrix:")
print(confusion_matrix(y_test, y_pred))

# Step 8: Save the model and the scaler
# Define the folder where you want to save the model
model_folder = 'saved_models'
os.makedirs(model_folder, exist_ok=True)

# Save the RandomForest model
model_filename = os.path.join(model_folder, 'random_forest_model.joblib')
joblib.dump(clf, model_filename)
print(f"Model saved at {model_filename}")

# Save the Scaler (Optional, for future use)
scaler_filename = os.path.join(model_folder, 'scaler.joblib')
joblib.dump(scaler, scaler_filename)
print(f"Scaler saved at {scaler_filename}")
