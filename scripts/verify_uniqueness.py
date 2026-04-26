import re

def verify_uniqueness():
    with open('lib/ai-tools-data.ts', 'r', encoding='utf-8') as f:
        content = f.read()
    
    existing_urls = set(re.findall(r'url:\s*"(.*?)"', content))
    existing_names = set(re.findall(r'name:\s*"(.*?)"', content))

    tools_to_check = [
        ("PeopleDB", "https://peopledb.co"),
        ("FLAEX AI", "https://www.flaex.ai"),
        ("Dev Blocks", "https://www.devblocks.app"),
        ("Scalify.ai", "https://www.scalify.ai"),
        ("AI Chatbot Support", "https://aichatbot.support/"),
        ("Seven Analytics", "https://seven.radostit.com"),
        ("T2M URL Shortener", "https://t2mio.com/"),
        ("Product Metrics", "https://www.productmetrics.io"),
        ("KraflIO", "https://kraflio.com"),
        ("Kiqo", "https://www.kiqo.ai/"),
        ("Furnea", "https://furnea.ai"),
        ("Wafler", "https://wafler.one/"),
        ("Soul Wish", "https://soulwish.app"),
        ("Bitsafve", "https://bitsafve.com"),
        ("Hi-Ai", "https://www.hi-ai.live/"),
        ("MoodTrackMe", "https://moodtrack.me/"),
        ("Reasonyx", "https://reasonyx.com"),
        ("TradeTab", "https://tradetab.co"),
        ("Expressify Ai", "https://www.expressify.ai")
    ]

    unique_tools = []
    print("Verifying uniqueness against current database...")
    for name, url in tools_to_check:
        # Standardize for comparison
        clean_url = url.replace('https://', '').replace('http://', '').strip('/')
        
        is_duplicate = False
        for ex_url in existing_urls:
            ex_clean = ex_url.replace('https://', '').replace('http://', '').strip('/')
            if clean_url == ex_clean or clean_url in ex_clean or ex_clean in clean_url:
                is_duplicate = True
                break
        
        if not is_duplicate:
            for ex_name in existing_names:
                if name.lower() == ex_name.lower():
                    is_duplicate = True
                    break
        
        if is_duplicate:
            print(f"❌ DUPLICATE: {name} ({url})")
        else:
            print(f"✅ UNIQUE: {name} ({url})")
            unique_tools.append({"name": name, "url": url})

    print(f"\nFinal Unique Tools: {len(unique_tools)}")
    return unique_tools

if __name__ == "__main__":
    verify_uniqueness()
