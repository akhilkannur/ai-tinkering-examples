import csv
from datetime import datetime

# The list of tools you verified are live on the site
verified_live_tools = [
    "Vidmix.ai", # Normalized from www.vidmix.ai
    "Ägglossning",
    "Festklänningar",
    "Overvisual",
    "ChattyFit",
    "SlideWhisper",
    "imejis.io",
    "Email Ferret",
    "AgentGatePay",
    "Hypnotype",
    "Computer Keyboard Shortcuts",
    "Kataloop",
    "Floowed",
    "StrideFuel",
    "Oravida AI",
    "AIRankPilot",
    "BookSwift",
    "SlidesCockpit",
    "3dSynth.app",
    "Crypto News Navigator",
    "Suburb Stack",
    "Cursor for Marketing Emails",
    "Markeplay",
    "Qeeebo",
    "feynn - Strategic Intelligence Platform",
    "AI Thumbnail",
    "AyeWatch AI",
    "PentestMate",
    "Bolta",
    "Sana Mujer",
    "Beatable",
    "Map Your Voyage",
    "AyeCreate",
    "Nicegram",
    "The Gold Calculator"
]

# Normalize for comparison (lowercase, strip whitespace)
verified_normalized = {name.lower().strip() for name in verified_live_tools}

def check_discrepancies():
    csv_tools = []
    cutoff_date = datetime(2025, 12, 1)
    
    print(f"Checking against {len(verified_live_tools)} verified live tools...\n")

    with open('tools_submissions.csv', 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            timestamp_str = row.get('Timestamp', '').strip()
            try:
                submission_date = datetime.strptime(timestamp_str, "%d/%m/%Y %H:%M:%S")
            except ValueError:
                continue

            if submission_date < cutoff_date:
                continue
            
            tool_name = row.get('What is the name of your tool', '').strip()
            if not tool_name: 
                continue

            csv_tools.append(tool_name)

    # Find what's in CSV but NOT in your verified list (Potential Mismatch)
    missing_from_live = []
    
    # Check each CSV tool against the verified set
    for tool in csv_tools:
        # Simple normalization check
        if tool.lower().strip() not in verified_normalized:
            # Try fuzzy matching or specific known variations?
            # For now, just flag it.
            missing_from_live.append(tool)

    if missing_from_live:
        print(f"WARNING: The following {len(missing_from_live)} tools are in the CSV (Dec 1+) but NOT in your provided live list:")
        for t in missing_from_live:
            print(f" - {t}")
        print("\nThese people would receive an email saying 'You are live', but they might not be!")
    else:
        print("SUCCESS: All recent CSV submissions match your verified live list.")

if __name__ == "__main__":
    check_discrepancies()
