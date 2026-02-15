const { BetaAnalyticsDataClient } = require('@google-analytics/data');
const path = require('path');

const PROPERTY_ID = '506136292';
const KEY_FILE_PATH = path.join(process.cwd(), 'ga-credentials.json');

const analyticsDataClient = new BetaAnalyticsDataClient({
  keyFilename: KEY_FILE_PATH,
});

async function checkLLMTraffic() {
  try {
    const [response] = await analyticsDataClient.runReport({
      property: "properties/" + PROPERTY_ID,
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'sessionSource' }],
      metrics: [{ name: 'activeUsers' }, { name: 'screenPageViews' }],
    });

    if (!response.rows || response.rows.length === 0) {
      console.log('No source data found for the last 30 days.');
    } else {
      console.log('Traffic Sources (Last 30 Days):');
      console.log("Source | Users | Views");
      console.log("----------------------");
      
      const llmSources = ['openai', 'chatgpt', 'claude', 'gemini', 'perplexity', 'bing', 'google-ai'];
      let foundLLM = false;

      response.rows.forEach(row => {
        const source = row.dimensionValues[0].value.toLowerCase();
        const isLLM = llmSources.some(llm => source.includes(llm));
        
        if (isLLM) {
          console.log(`${row.dimensionValues[0].value} | ${row.metricValues[0].value} | ${row.metricValues[1].value}`);
          foundLLM = true;
        }
      });

      if (!foundLLM) {
        console.log('No traffic found from major LLM referrers in the top results.');
        console.log('\nTop 10 Sources (Overall):');
        response.rows.slice(0, 20).forEach(row => {
           console.log(`${row.dimensionValues[0].value} | ${row.metricValues[0].value} | ${row.metricValues[1].value}`);
        });
      }
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

checkLLMTraffic();
