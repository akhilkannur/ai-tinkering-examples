const { BetaAnalyticsDataClient } = require('@google-analytics/data');
const path = require('path');

const PROPERTY_ID = '506136292';
const KEY_FILE_PATH = path.join(process.cwd(), 'ga-credentials.json');

const analyticsDataClient = new BetaAnalyticsDataClient({
  keyFilename: KEY_FILE_PATH,
});

async function runReport() {
  console.log("Fetching all events for today...");
  
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
        { name: 'eventName' },
        { name: 'sessionSource' },
        { name: 'sessionMedium' }
      ],
      metrics: [
        { name: 'eventCount' }
      ],
      limit: 100,
    });

    console.log("\nALL EVENTS TODAY:\n");
    
    if (!response.rows || response.rows.length === 0) {
      console.log('No data found for today.');
    } else {
      console.log("Event | Source / Medium | Count");
      console.log("------------------------------");
      response.rows.forEach(row => {
        const event = row.dimensionValues[0].value;
        const source = row.dimensionValues[1].value;
        const medium = row.dimensionValues[2].value;
        const count = row.metricValues[0].value;
        console.log(`${event} | ${source} / ${medium} | ${count}`);
      });
    }
  } catch (error) {
    console.error('\nERROR fetching data:');
    console.error(error.message);
  }
}

runReport();
