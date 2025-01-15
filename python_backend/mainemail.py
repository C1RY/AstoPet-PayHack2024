import pandas as pd

# List of your CSV files (adjust paths to your actual files)
filepaths = ['DataFiles/1.Benign_list_big_final.csv', 'DataFiles/2.online-valid.csv', 'DataFiles/3.legitimate.csv', 'DataFiles/4.phishing.csv', 'DataFiles/5.urldata.csv']

# Load all CSV files into a single DataFrame
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

# Preview the combined data to check the first few rows
print(data.head())
