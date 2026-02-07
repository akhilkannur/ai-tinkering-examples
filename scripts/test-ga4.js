const { BetaAnalyticsDataClient } = require('@google-analytics/data');
const path = require('path');

// Configuration
const PROPERTY_ID = '506136292';
const KEY_FILE_PATH = path.join(process.cwd(), 'ga-credentials.json');

const analyticsDataClient = new BetaAnalyticsDataClient({
  keyFilename: KEY_FILE_PATH,
});

async function runReport() {
  console.log("Fetching today top pages...");
  
  try {
    const [response] = await analyticsDataClient.runReport({
      property: "properties/" + PROPERTY_ID,
      dateRanges: [
        {
          startDate: 'today',
          endDate: 'today',
        },
      ],
      dimensions: [
        {
          name: 'pagePath',
        },
      ],
      metrics: [
        {
          name: 'activeUsers',
        },
        {
          name: 'screenPageViews',
        }
      ],
      limit: 10,
    });

    console.log("\nTODAY TOP PAGES:\n");
    
    if (!response.rows || response.rows.length === 0) {
      console.log('No data found for today yet.');
    } else {
      response.rows.forEach(row => {
        const page = row.dimensionValues[0].value;
        const users = row.metricValues[0].value;
        const views = row.metricValues[1].value;
        console.log(page + " | Users: " + users + " | Views: " + views);
      });
    }
    
    console.log('\nConnection successful!');
  } catch (error) {
    console.error('\nERROR fetching data:');
    console.error(error.message);
  }
}

runReport();