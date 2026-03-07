import csv
from datetime import datetime

def find_new_submissions():
    # Last tool processed today (Alignmint) was submitted March 5, 2026 09:02:19
    cutoff_date = datetime(2026, 3, 5, 9, 2, 19)
    new_entries = []

    print(f"Checking for submissions after {cutoff_date}...")

    with open('latest_submissions.csv', 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            timestamp_str = row.get('Timestamp', '').strip()
            try:
                # Format is usually dd/mm/yyyy HH:MM:SS
                submission_date = datetime.strptime(timestamp_str, "%d/%m/%Y %H:%M:%S")
            except ValueError:
                continue

            if submission_date > cutoff_date:
                tool_name = row.get('What is the name of your tool', '').strip()
                email = row.get('Please enter your contact email', '').strip() or row.get('Email address', '').strip()
                desc = row.get('Provide a brief description of your tool (maximum 280 characters).', '').strip()
                url = row.get('What is the URL where your tool can be accessed?', '').strip()
                
                new_entries.append({
                    'date': submission_date,
                    'name': tool_name,
                    'email': email,
                    'desc': desc,
                    'url': url
                })

    if new_entries:
        print(f"Found {len(new_entries)} new submissions:")
        for entry in new_entries:
            print(f"- [{entry['date']}] {entry['name']} ({entry['url']})")
    else:
        print("No new submissions found after Jan 11, 2026.")

if __name__ == "__main__":
    find_new_submissions()