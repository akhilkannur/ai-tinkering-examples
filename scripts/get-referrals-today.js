const { BetaAnalyticsDataClient } = require('@google-analytics/data');
const path = require('path');

const PROPERTY_ID = '506136292';
const KEY_FILE_PATH = path.join(process.cwd(), 'ga-credentials.json');

const analyticsDataClient = new BetaAnalyticsDataClient({
  keyFilename: KEY_FILE_PATH,
});

async function runReport() {
  console.log("Fetching traffic sources for today...");
  
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
          name: 'sessionSource',
        },
        {
            name: 'sessionMedium'
        }
      ],
      metrics: [
        {
          name: 'activeUsers',
        },
      ],
      limit: 20,
    });

    console.log("\nTRAFFIC SOURCES TODAY:\n");
    
    if (!response.rows || response.rows.length === 0) {
      console.log('No data found for today yet.');
    } else {
      console.log("Source / Medium | Users");
      console.log("-----------------------");
      response.rows.forEach(row => {
        const source = row.dimensionValues[0].value;
        const medium = row.dimensionValues[1].value;
        const users = row.metricValues[0].value;
        console.log(`${source} / ${medium} | ${users}`);
      });
    }
  } catch (error) {
    console.error('\nERROR fetching data:');
    console.error(error.message);
  }
}

runReport();