# Duplicate Lead Merger 🧹

This tool helps you clean up your lead lists by identifying duplicate emails and merging them into a single "Golden Record" based on your business logic.

## How it Works
1.  **Reads** your raw CSV file (e.g., `dirty_leads.csv`).
2.  **Groups** records by a unique key (default: `Email`).
3.  **Decides** a "Winner" for each group based on a priority column (default: `Last_Active` date).
4.  **Enriches** the Winner by filling in any missing blanks with data from the "Loser" duplicates (Survivorship).
5.  **Outputs** a clean list (`clean_leads.csv`) and a report of what was merged.

## Configuration (`config.json`)
You can customize how the merger works without touching the code:
- `input_file`: Your raw data filename.
- `merge_key`: The column used to find duplicates (e.g., "Email").
- `priority_column`: The column used to pick the winner (e.g., "Last_Active", "Created_Date").
- `columns_to_merge`: List of specific columns to copy data for (optional).

## Usage
1.  Place your data in `dirty_leads.csv` (or update config).
2.  Run the script:
    ```bash
    python merge_leads.py
    ```
3.  Check `clean_leads.csv` for your results!

## For Developers (Agent Mode)
- **Input:** CSV file.
- **Output:** CSV file + Merge Report CSV.
- **Logic:** `merge_leads.py` contains the `merge_group` function which handles the survivorship logic.
- **Tests:** Run `python tests.py` to verify logic changes.
