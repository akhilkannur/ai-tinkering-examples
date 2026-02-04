import pandas as pd
import json
import os
import sys

def explain(msg):
    """Prints a message to the user in a friendly, educational way."""
    print(f"[Duplicate Merger] {msg}")

def load_config():
    try:
        with open('config.json', 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        explain("Error: config.json not found.")
        sys.exit(1)

def merge_group(group, priority_col, merge_cols):
    """
    Merges a group of duplicate records into a single 'winner' record.
    Assumes group is already sorted by priority (descending).
    """
    # The first record is the 'Winner' because it's the most recent (due to sorting)
    winner = group.iloc[0].copy()
    
    # Track which IDs are being merged
    winner_id = winner.get('Lead_ID', 'Unknown')
    loser_ids = group.iloc[1:]['Lead_ID'].tolist() if 'Lead_ID' in group.columns else []
    
    # Iterate through the 'Losers' to fill in missing data in the 'Winner'
    for _, loser in group.iloc[1:].iterrows():
        for col in merge_cols:
            if col in winner and col in loser:
                # If winner is missing data (NaN or empty string) and loser has it, take it
                if pd.isna(winner[col]) or winner[col] == "":
                    if not pd.isna(loser[col]) and loser[col] != "":
                        winner[col] = loser[col]
                        
    return winner, loser_ids

def main():
    explain("Starting the Duplicate Lead Merger...")
    
    # 1. Load Configuration
    config = load_config()
    input_file = config.get('input_file', 'dirty_leads.csv')
    output_file = config.get('output_file', 'clean_leads.csv')
    report_file = config.get('report_file', 'merge_report.csv')
    merge_key = config.get('merge_key', 'Email')
    priority_col = config.get('priority_column', 'Last_Active')
    # Auto-detect columns to merge if not specified, but for now use config or all columns
    columns_to_merge = config.get('columns_to_merge', [])

    # 2. Load Data
    if not os.path.exists(input_file):
        explain(f"Input file '{input_file}' not found. Please create it or check config.")
        return

    df = pd.read_csv(input_file)
    explain(f"Loaded {len(df)} rows from {input_file}.")
    
    if merge_key not in df.columns:
        explain(f"Error: Merge key column '{merge_key}' not found in CSV.")
        return

    # 3. Pre-process
    # Convert priority column to datetime to ensure correct sorting
    try:
        df[priority_col] = pd.to_datetime(df[priority_col])
        explain(f"Converted '{priority_col}' to datetime for accurate sorting.")
    except Exception as e:
        explain(f"Warning: Could not convert '{priority_col}' to datetime. Sorting might be alphanumeric. ({e})")

    # If columns_to_merge is empty, use all columns except the key and priority
    if not columns_to_merge:
        columns_to_merge = [c for c in df.columns if c not in [merge_key, priority_col, 'Lead_ID']]

    # 4. Identify and Merge Duplicates
    # Sort by Merge Key and then Priority Column (Descending) so the "Newest" is first
    df_sorted = df.sort_values(by=[merge_key, priority_col], ascending=[True, False])
    
    merged_rows = []
    merge_log = []

    # Group by the unique identifier (Email)
    grouped = df_sorted.groupby(merge_key)
    
    duplicates_count = 0
    
    for email, group in grouped:
        if len(group) > 1:
            duplicates_count += 1
            winner, loser_ids = merge_group(group, priority_col, columns_to_merge)
            merged_rows.append(winner)
            
            # Log the action
            for l_id in loser_ids:
                merge_log.append({
                    "Winner_ID": winner.get('Lead_ID'),
                    "Loser_ID": l_id,
                    "Merge_Key": email,
                    "Action": "Merged into Winner"
                })
        else:
            # No duplicates, just keep as is
            merged_rows.append(group.iloc[0])

    # 5. Create Result DataFrame
    result_df = pd.DataFrame(merged_rows)
    
    # Restore original column order if possible
    result_df = result_df[df.columns]
    
    explain(f"Found {duplicates_count} sets of duplicates.")
    explain(f"Original count: {len(df)}. New count: {len(result_df)}.")
    
    # 6. Save Output
    result_df.to_csv(output_file, index=False)
    explain(f"Saved clean list to '{output_file}'.")
    
    if merge_log:
        log_df = pd.DataFrame(merge_log)
        log_df.to_csv(report_file, index=False)
        explain(f"Saved merge report to '{report_file}'.")
    else:
        explain("No merges occurred, so no report file created.")

    explain("Task Complete!")

if __name__ == "__main__":
    main()
