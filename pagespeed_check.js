const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/home/akhilnairmk/.cache/ms-playwright/chromium-1200/chrome-linux64/chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  console.log('Navigating to PageSpeed Insights...');
  await page.goto('https://pagespeed.web.dev/analysis/https-realaiexamples-com/h8w3yfrdfk?form_factor=mobile', {
    waitUntil: 'networkidle2',
    timeout: 60000
  });

  console.log('Waiting for results to load (this can take up to 30 seconds)...');
  try {
    // Wait for the performance score or some key element to appear
    await page.waitForSelector('.lh-gauge__wrapper', { timeout: 60000 });
    
    const data = await page.evaluate(() => {
      const getScore = (label) => {
        const elements = Array.from(document.querySelectorAll('.lh-category-header'));
        const header = elements.find(el => el.innerText.includes(label));
        return header ? header.querySelector('.lh-gauge__percentage')?.innerText : 'N/A';
      };

      const getMetric = (label) => {
        const elements = Array.from(document.querySelectorAll('.lh-metric'));
        const metric = elements.find(el => el.innerText.includes(label));
        return metric ? metric.querySelector('.lh-metric__value')?.innerText : 'N/A';
      };

      return {
        performance: getScore('Performance'),
        accessibility: getScore('Accessibility'),
        bestPractices: getScore('Best Practices'),
        seo: getScore('SEO'),
        lcp: getMetric('Largest Contentful Paint'),
        fcp: getMetric('First Contentful Paint'),
        cls: getMetric('Cumulative Layout Shift'),
        tbt: getMetric('Total Blocking Time'),
        si: getMetric('Speed Index')
      };
    });

    console.log(JSON.stringify(data, null, 2));
  } catch (e) {
    console.log('Error or timeout waiting for results:', e.message);
    const html = await page.content();
    console.log('Page HTML snippet:', html.substring(0, 500));
  }

  await browser.close();
})();
