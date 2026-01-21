import csv
import io

from datetime import datetime

def process_and_sample():
    tools = []
    seen_emails = set()
    cutoff_date = datetime(2025, 12, 1)
    
    # Read the CSV file
    with open('tools_submissions.csv', 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            # Parse timestamp: "12/09/2024 13:27:28" -> dd/mm/yyyy
            timestamp_str = row.get('Timestamp', '').strip()
            try:
                # Assuming format is dd/mm/yyyy based on previous file read
                submission_date = datetime.strptime(timestamp_str, "%d/%m/%Y %H:%M:%S")
            except ValueError:
                continue

            if submission_date < cutoff_date:
                continue

            # Get the best email: preferred 'contact email', fallback to 'Email address'
            email = row.get('Please enter your contact email', '').strip()
            if not email:
                email = row.get('Email address', '').strip()
            
            tool_name = row.get('What is the name of your tool', '').strip()
            
            # Skip if critical info is missing
            if not email or not tool_name:
                continue
                
            # Deduplicate by email
            if email in seen_emails:
                continue
            
            seen_emails.add(email)
            
            tools.append({
                'email': email,
                'tool_name': tool_name,
            })

    # Generate sample from the last entry (likely most recent)
    if tools:
        sample = tools[-1]
        email_body = f""".
From: akhil@mail.realaiexamples.com
To: {sample['email']}
Reply-To: akhil@realaiexamples.com
        Subject: Your tool, {sample['tool_name']}, is now live on Real AI Examples

Hey there!

I wanted to reach out because you submitted {sample['tool_name']} through the Tooling Around directory form recently.
I've been working on something new called Real AI Examples, where I'm curating practical AI tools and use cases. Over the last few weeks, I've been hand-picking submissions that stood out, and {sample['tool_name']} made the cut.

Your tool is now live at https://realaiexamples.com/tools

You don't need to do anything, but if you want to update any details or have questions, just reply to this email.

Thanks,
Akhil
"""
        print(f"Total unique recipients found: {len(tools)}")
        print("\n--- SAMPLE EMAIL ---")
        print(email_body)
    else:
        print("No valid entries found.")

if __name__ == "__main__":
    process_and_sample()
