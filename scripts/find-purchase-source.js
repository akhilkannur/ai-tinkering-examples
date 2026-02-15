const { BetaAnalyticsDataClient } = require('@google-analytics/data');
const path = require('path');

const PROPERTY_ID = '506136292';
const KEY_FILE_PATH = path.join(process.cwd(), 'ga-credentials.json');

const analyticsDataClient = new BetaAnalyticsDataClient({
  keyFilename: KEY_FILE_PATH,
});

async function runReport() {
  console.log("Analyzing traffic sources for Dodo payment clicks today...");
  
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
        { name: 'sessionSource' },
        { name: 'sessionMedium' },
        { name: 'pagePath' }
      ],
      metrics: [
        { name: 'eventCount' }
      ],
      dimensionFilter: {
        filter: {
          fieldName: 'eventName',
          stringFilter: {
            value: 'click_dodo_payment',
            matchType: 'EXACT',
          },
        },
      },
    });

    console.log("\nDODO PAYMENT CLICKS TODAY:\n");
    
    if (!response.rows || response.rows.length === 0) {
      console.log('No Dodo payment clicks found for today.');
    } else {
      console.log("Source / Medium | Page Path | Clicks");
      console.log("------------------------------------");
      response.rows.forEach(row => {
        const source = row.dimensionValues[0].value;
        const medium = row.dimensionValues[1].value;
        const pagePath = row.dimensionValues[2].value;
        const clicks = row.metricValues[0].value;
        console.log(`${source} / ${medium} | ${pagePath} | ${clicks}`);
      });
    }
  } catch (error) {
    console.error('\nERROR fetching data:');
    console.error(error.message);
  }
}

runReport();
