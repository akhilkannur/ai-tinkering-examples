const { BetaAnalyticsDataClient } = require('@google-analytics/data');
const path = require('path');

const PROPERTY_ID = '506136292';
const KEY_FILE_PATH = path.join(process.cwd(), 'ga-credentials.json');

const analyticsDataClient = new BetaAnalyticsDataClient({
  keyFilename: KEY_FILE_PATH,
});

async function runTrendReport() {
  console.log("Analyzing organic traffic trends (Last 90 days)...");
  
  try {
    const [response] = await analyticsDataClient.runReport({
      property: "properties/" + PROPERTY_ID,
      dateRanges: [
        {
          startDate: '90daysAgo',
          endDate: 'today',
        },
      ],
      dimensions: [
        {
          name: 'yearMonth',
        },
      ],
      dimensionFilter: {
        filter: {
          fieldName: 'sessionMedium',
          stringFilter: {
            value: 'organic',
            matchType: 'EXACT',
          },
        },
      },
      metrics: [
        {
          name: 'activeUsers',
        },
      ],
      orderBys: [
        {
          dimension: {
            dimensionName: 'yearMonth',
          },
          desc: false,
        },
      ],
    });

    console.log("\nORGANIC TRAFFIC TREND (Users per Month):\n");
    
    if (!response.rows || response.rows.length === 0) {
      console.log('No organic traffic data found for this period.');
    } else {
      response.rows.forEach(row => {
        const month = row.dimensionValues[0].value;
        const users = row.metricValues[0].value;
        console.log(`${month} | Organic Users: ${users}`);
      });
    }

    const [weeklyResponse] = await analyticsDataClient.runReport({
        property: "properties/" + PROPERTY_ID,
        dateRanges: [
          {
            startDate: '30daysAgo',
            endDate: 'today',
          },
        ],
        dimensions: [
          {
            name: 'nthWeek',
          },
        ],
        dimensionFilter: {
          filter: {
            fieldName: 'sessionMedium',
            stringFilter: {
              value: 'organic',
              matchType: 'EXACT',
            },
          },
        },
        metrics: [
          {
            name: 'activeUsers',
          },
        ],
        orderBys: [
            {
              dimension: {
                dimensionName: 'nthWeek',
              },
              desc: false,
            },
          ],
      });

      console.log("\nWEEKLY ORGANIC TREND (Last 30 Days):\n");
      if (weeklyResponse.rows) {
        weeklyResponse.rows.forEach(row => {
            console.log(`Week ${row.dimensionValues[0].value} | Organic Users: ${row.metricValues[0].value}`);
        });
      }

  } catch (error) {
    console.error('\nERROR fetching data:');
    console.error(error.message);
  }
}

runTrendReport();