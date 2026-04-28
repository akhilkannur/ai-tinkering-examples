import csv
import re
import os

def get_csv_data(file_path):
    data = {}
    if not os.path.exists(file_path):
        return data
    with open(file_path, 'r', encoding='utf-8') as f:
        reader = csv.reader(f)
        header = next(reader)
        for row in reader:
            if len(row) > 6:
                name = row[2].strip()
                desc_brief = row[4].strip()
                desc_detailed = row[5].strip()
                url = row[6].strip().rstrip('/')
                # Prefer brief but check detailed if brief is empty
                desc = desc_brief if desc_brief else desc_detailed
                if url:
                    data[url] = desc
    return data

def get_ts_data(file_path):
    data = {}
    if not os.path.exists(file_path):
        return data
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Use a simpler but more reliable regex to find all tool blocks
    # We look for the pattern between name and category/tags
    # This is a bit hacky but should work for this specific file structure
    entries = content.split('},')
    for entry in entries:
        url_match = re.search(r'url:\s*"(.*?)"', entry)
        desc_match = re.search(r'description:\s*"(.*?)"', entry)
        if url_match and desc_match:
            url = url_match.group(1).strip().rstrip('/')
            desc = desc_match.group(1).replace('\\"', '"').replace('\\\\u', '\\u').strip()
            data[url] = desc
    return data

def main():
    csv_file = 'latest_submissions_retry.csv'
    ts_file = 'lib/ai-tools-data.ts'
    
    csv_data = get_csv_data(csv_file)
    ts_data = get_ts_data(ts_file)
    
    matches = 0
    different = 0
    not_in_csv = 0
    
    with open('description_differences.txt', 'w', encoding='utf-8') as out:
        count = 0
        for url, ts_desc in ts_data.items():
            if url in csv_data:
                csv_desc = csv_data[url]
                ts_norm = " ".join(ts_desc.split())
                csv_norm = " ".join(csv_desc.split())
                
                if not (ts_norm == csv_norm or ts_norm in csv_norm or csv_norm in ts_norm):
                    different += 1
                    if count < 50: # Sample 50 for analysis
                        out.write(f"URL: {url}\n")
                        out.write(f"ORIGINAL: {csv_desc}\n")
                        out.write(f"CURRENT: {ts_desc}\n")
                        out.write("-" * 40 + "\n")
                        count += 1
            else:
                not_in_csv += 1
            
    print(f"Comparison Results:")
    print(f"-------------------")
    print(f"Total tools in TS: {len(ts_data)}")
    print(f"Matches original submission: {matches}")
    print(f"Modified/Different from original: {different}")
    print(f"Tool URL not found in CSV: {not_in_csv}")

if __name__ == "__main__":
    main()
