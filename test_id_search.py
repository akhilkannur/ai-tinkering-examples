import asyncio
from playwright.async_api import async_playwright

async def test_id():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        url = "https://www.linkedin.com/ad-library/search?advertiserIds=3185"
        print(f"Testing URL: {url}")
        await page.goto(url)
        await asyncio.sleep(5)
        
        # Check if the advertiser name "Salesforce" appears in the results
        content = await page.inner_text("body")
        if "Salesforce" in content:
            print("✅ SUCCESS: Found 'Salesforce' on the page.")
            # Check for ad count
            import re
            match = re.search(r'([\d,]+)\s+ads?\s+match', content, re.IGNORECASE)
            if match:
                print(f"✅ FOUND: {match.group(1)} ads matching.")
        else:
            print("❌ FAILURE: Could not find 'Salesforce' on the page.")
            
        await browser.close()

if __name__ == "__main__":
    asyncio.run(test_id())
