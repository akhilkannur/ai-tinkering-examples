const { BetaAnalyticsDataClient } = require('@google-analytics/data');
const path = require('path');

const PROPERTY_ID = '506136292';
const KEY_FILE_PATH = path.join(process.cwd(), 'ga-credentials.json');

const analyticsDataClient = new BetaAnalyticsDataClient({
  keyFilename: KEY_FILE_PATH,
});

async function runReport() {
  console.log("Checking dodo clicks...");
  
  try {
    const [response] = await analyticsDataClient.runReport({
      property: "properties/" + PROPERTY_ID,
      dateRanges: [
        {
          startDate: '7daysAgo',
          endDate: 'today',
        },
      ],
      dimensions: [
        {
          name: 'eventName',
        },
      ],
      metrics: [
        {
          name: 'eventCount',
        }
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

    if (!response.rows || response.rows.length === 0) {
      console.log('No click_dodo_payment events found in the last 7 days.');
    } else {
      const count = response.rows[0].metricValues[0].value;
      console.log('Clicks: ' + count);
    }
  } catch (error) {
    console.error('Error: ' + error.message);
  }
}

runReport();