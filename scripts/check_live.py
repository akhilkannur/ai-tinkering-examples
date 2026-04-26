import requests
import json

urls = [
    "https://peopledb.co",
    "https://flameproxies.com/",
    "https://www.flaex.ai",
    "https://www.devblocks.app",
    "https://ultimatetools.eu/",
    "https://www.scalify.ai",
    "https://thatsmy.ai",
    "https://roastmylandingpage.io/",
    "https://aichatbot.support/",
    "https://seven.radostit.com",
    "https://t2mio.com/",
    "https://www.productmetrics.io",
    "https://kraflio.com",
    "https://www.kiqo.ai/",
    "https://furnea.ai",
    "https://wafler.one/",
    "https://soulwish.app",
    "https://clyrbg.com",
    "https://bitsafve.com",
    "https://www.hi-ai.live/",
    "https://moodtrack.me/",
    "https://reasonyx.com",
    "https://tradetab.co",
    "https://www.expressify.ai"
]

def check_urls():
    results = []
    print("Checking availability...")
    for url in urls:
        try:
            # Use a realistic User-Agent to avoid blocks
            headers = {'User-Agent': 'Mozilla/5.0'}
            response = requests.get(url, timeout=10, headers=headers)
            if response.status_code < 400:
                print(f"✅ {url} (Status: {response.status_code})")
                results.append(url)
            else:
                print(f"❌ {url} (Status: {response.status_code})")
        except Exception as e:
            print(f"❌ {url} (Error: {str(e)})")
    
    print(f"\nLive URLs: {len(results)} of {len(urls)}")
    with open('live_check_results.json', 'w') as f:
        json.dump(results, f, indent=2)

if __name__ == "__main__":
    check_urls()
