import os
import random

# Target: 100 files total
TARGET_COUNTS = {
    'competitive-intel': 14,
    'content-ops': 18,
    'cro': 5,
    'customer-success': 5,
    'e-commerce': 5,
    'lead-gen': 18,
    'marketing-ops': 10,
    'paid-media': 5,
    'product-ops': 2,
    'retention': 3,
    'sales-ops': 5,
    'seo': 15,
    'strategic-ops': 5
}

BASE_DIR = 'marketing-agent-blueprints/prompts'
TOTAL_KEPT = 0

def get_quality_score(filepath):
    """
    Simple heuristic for quality:
    - Has 'archetype' (it's upgraded) = +10 pts
    - Has 'Researcher' or 'Hybrid' (it's autonomous) = +5 pts
    - Is 'Paid' (usually better quality) = +2 pts (we treat them as free for this repo)
    """
    score = 0
    try:
        with open(filepath, 'r') as f:
            content = f.read()
            if 'archetype:' in content:
                score += 10
            if 'archetype: Researcher' in content or 'archetype: Hybrid' in content:
                score += 5
            if 'isPremium: true' in content:
                score += 2
    except:
        pass
    return score

# 1. Scan and Score
files_by_category = {}

for root, dirs, files in os.walk(BASE_DIR):
    category = os.path.basename(root)
    if category == 'prompts': continue # Skip root
    
    files_by_category[category] = []
    for file in files:
        if file.endswith('.md'):
            filepath = os.path.join(root, file)
            score = get_quality_score(filepath)
            files_by_category[category].append((filepath, score))

# 2. Select and Prune
files_to_delete = []

print("--- SELECTION LOG ---")
for category, target in TARGET_COUNTS.items():
    if category not in files_by_category:
        continue
        
    # Sort by score (descending)
    candidates = files_by_category[category]
    candidates.sort(key=lambda x: x[1], reverse=True)
    
    # Keep top N
    keep = candidates[:target]
    remove = candidates[target:]
    
    TOTAL_KEPT += len(keep)
    print(f"Category: {category} | Target: {target} | Kept: {len(keep)} | Removing: {len(remove)}")
    
    # Print top 3 kept for sanity check
    for k in keep[:3]:
         print(f"  Keeping: {os.path.basename(k[0])} (Score: {k[1]})")

    for r in remove:
        files_to_delete.append(r[0])

# 3. Execute Deletion
for filepath in files_to_delete:
    os.remove(filepath)

print(f"\n--- COMPLETE ---")
print(f"Total Agents Remaining: {TOTAL_KEPT}")
print(f"Total Agents Deleted: {len(files_to_delete)}")
