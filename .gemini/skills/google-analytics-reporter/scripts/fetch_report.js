const { BetaAnalyticsDataClient } = require('@google-analytics/data');
const path = require('path');

const PROPERTY_ID = '506136292';
const KEY_FILE_PATH = path.join(process.cwd(), 'ga-credentials.json');

const analyticsDataClient = new BetaAnalyticsDataClient({
  keyFilename: KEY_FILE_PATH,
});

async function runReport(startDate = 'today', endDate = 'today') {
  try {
    const [response] = await analyticsDataClient.runReport({
      property: "properties/" + PROPERTY_ID,
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: 'pagePath' }],
      metrics: [{ name: 'activeUsers' }, { name: 'screenPageViews' }],
      limit: 10,
    });

    if (!response.rows || response.rows.length === 0) {
      console.log(`No data found for ${startDate} to ${endDate}.`);
    } else {
      console.log(`Report for ${startDate} to ${endDate}:`);
      console.log("Page | Users | Views");
      console.log("--------------------");
      response.rows.forEach(row => {
        console.log(`${row.dimensionValues[0].value} | ${row.metricValues[0].value} | ${row.metricValues[1].value}`);
      });
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

const args = process.argv.slice(2);
const start = args[0] || 'today';
const end = args[1] || 'today';
runReport(start, end);
