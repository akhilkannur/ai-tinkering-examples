import pandas as pd
import re
import json
import os
from typing import Dict, Any, Optional

# Load Configuration
CONFIG_FILE = 'config.json'

def load_config(config_path: str = CONFIG_FILE) -> Optional[Dict[str, Any]]:
    """Loads the JSON configuration file."""
    if not os.path.exists(config_path):
        print(f"Error: {config_path} not found!")
        return None
    with open(config_path, 'r') as f:
        return json.load(f)

def normalize_phone(phone: Any, country_code: str = "+1") -> str:
    """
    Strips non-digits from phone numbers.
    Adds country code if the number appears to be a local 10-digit number.
    """
    phone_str = str(phone)
    digits = re.sub(r'\D', '', phone_str)
    
    # Standard US/North American Logic
    if len(digits) == 10:
        return f"{country_code}{digits}"
    elif len(digits) == 11 and digits.startswith('1'):
         return f"+{digits}"
    
    # Return raw digits if it doesn't match expected patterns
    return digits

def explain(step_name: str, description: str):
    """Prints a friendly, educational explanation of the current step."""
    print(f"\n🔹 {step_name}")
    print(f"   ℹ️  {description}")

def process_dataframe(df: pd.DataFrame, config: Dict[str, Any]) -> pd.DataFrame:
    """
    Applies all normalization logic to the DataFrame based on config.
    Separated for easier testing and modification.
    """
    cols = config.get('columns', {})
    settings = config.get('settings', {})
    
    # 1. Normalize Names
    col_name = cols.get('name')
    if col_name and col_name in df.columns and settings.get('format_names_title_case'):
        explain("Standardizing Names", f"Converting '{col_name}' to Title Case (e.g., 'JOHN' -> 'John'). This makes emails feel more personal.")
        df[col_name] = df[col_name].astype(str).str.title()
        
    # 2. Normalize Emails
    col_email = cols.get('email')
    if col_email and col_email in df.columns:
        if settings.get('email_lowercase'):
            explain("Cleaning Emails", f"Converting '{col_email}' to lowercase and removing hidden spaces. This prevents duplicate records in your CRM.")
            df[col_email] = df[col_email].astype(str).str.lower().str.strip()
            
    # 3. Normalize Phones
    col_phone = cols.get('phone')
    if col_phone and col_phone in df.columns:
        default_code = settings.get('default_country_code', '+1')
        explain("Formatting Phones", f"Stripping symbols from '{col_phone}' and adding the country code '{default_code}'. This ensures your dialer software works correctly.")
        df[col_phone] = df[col_phone].apply(lambda x: normalize_phone(x, default_code))
        
    return df

def main():
    print("\n👋 Welcome to the CRM Data Normalizer!")
    print("   I'm going to clean up your spreadsheet now.\n")

    config = load_config()
    if not config: return

    input_file = config.get('input_file', 'data.csv')
    output_file = config.get('output_file', 'cleaned_data.csv')

    try:
        explain("Loading Data", f"Reading '{input_file}'. We are creating a temporary copy in memory so your original file stays safe.")
        df = pd.read_csv(input_file)
        print(f"   ✅ Successfully loaded {len(df)} rows.")
        
        df_clean = process_dataframe(df, config)

        explain("Saving Results", f"Writing the clean data to '{output_file}'. You can open this file in Excel or upload it directly to Salesforce/HubSpot.")
        df_clean.to_csv(output_file, index=False)
        print(f"   ✅ Done! Check '{output_file}' for your results.")
        
    except FileNotFoundError:
        print(f"Error: Could not find input file '{input_file}'. Check your config.json.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

if __name__ == "__main__":
    main()