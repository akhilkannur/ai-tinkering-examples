# Module: CRM Data Normalizer

## Purpose
Standardizes CSV contact data for CRM import. 
- **Operations:** Title Casing names, lowering emails, E.164 phone formatting.
- **Engine:** Python (Pandas).

## Agent Instructions
1.  **Inspect Data:** Check the user's input CSV headers.
2.  **Configure:** Update `config.json` to map the input CSV headers to the expected schema (Name, Email, Phone) and set preferences (country codes).
3.  **Execute:** Run `python clean_data.py`.
4.  **Deliver:** The output will be at `final_import_ready.csv` (or whatever you set in config).

## 🧠 Behind the Scenes (For Humans)
If you're running this yourself and wondering what these commands do:

*   **`requirements.txt`**: Think of this as a "Shopping List" for the script. It tells your computer, "I need the `pandas` library to run."
*   **`pip install`**: This is the command that goes to the store (the internet) and buys everything on the shopping list.
*   **`venv` (Virtual Environment)**: This creates a sandbox. It prevents this script's tools from messing with other programs on your computer. It's like putting down a plastic sheet before painting.

## Configuration (`config.json`)
```json
{
  "input_file": "path/to/input.csv",
  "output_file": "path/to/output.csv",
  "columns": {
    "phone": "Raw Phone Column Name",
    "name": "Raw Name Column Name",
    "email": "Raw Email Column Name"
  },
  "settings": {
    "default_country_code": "+1"
  }
}
```