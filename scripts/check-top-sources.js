const { BetaAnalyticsDataClient } = require('@google-analytics/data');
const path = require('path');

const PROPERTY_ID = '506136292';
const KEY_FILE_PATH = path.join(process.cwd(), 'ga-credentials.json');

const analyticsDataClient = new BetaAnalyticsDataClient({
  keyFilename: KEY_FILE_PATH,
});

async function checkTopSources() {
  try {
    const [response] = await analyticsDataClient.runReport({
      property: "properties/" + PROPERTY_ID,
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'sessionSource' }],
      metrics: [{ name: 'activeUsers' }, { name: 'screenPageViews' }],
      limit: 50,
    });

    if (!response.rows || response.rows.length === 0) {
      console.log('No source data found.');
    } else {
      console.log('Top 50 Traffic Sources (Last 30 Days):');
      console.log("Source | Users | Views");
      console.log("----------------------");
      response.rows.forEach(row => {
        console.log(`${row.dimensionValues[0].value} | ${row.metricValues[0].value} | ${row.metricValues[1].value}`);
      });
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

checkTopSources();
