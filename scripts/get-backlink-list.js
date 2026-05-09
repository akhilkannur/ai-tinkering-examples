const https = require('https');

const LOGIN = 'akhil@lisnagency.online';
const PASS = 'b3fc3ef0fccdde5b';
const TARGET = 'realaiexamples.com';

const postData = JSON.stringify([
  {
    target: TARGET,
    limit: 100,
    order_by: ["rank,desc"]
  }
]);

const options = {
  hostname: 'api.dataforseo.com',
  path: '/v3/backlinks/backlinks/live',
  method: 'POST',
  headers: {
    'Authorization': 'Basic ' + Buffer.from(LOGIN + ':' + PASS).toString('base64'),
    'Content-Type': 'application/json',
    'Content-Length': postData.length
  }
};

console.log(`🔍 Fetching detailed backlinks for ${TARGET}...`);

const req = https.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const response = JSON.parse(data);
      if (response.status_code === 20000) {
        const result = response.tasks[0].result[0];
        console.log(`\n🔗 TOP BACKLINKS (${result.items.length} found)`);
        console.log('----------------------------');
        
        result.items.forEach((item, index) => {
          console.log(`${index + 1}. [${item.url_from}]`);
          console.log(`   Type: ${item.item_type} | Anchor: "${item.anchor || 'No text'}"`);
          console.log(`   To: ${item.url_to}`);
          console.log('');
        });
        
        console.log('----------------------------\n');
      } else {
        console.error('❌ API Error:', response.status_message);
      }
    } catch (e) {
      console.error('❌ Failed to parse response:', e.message);
    }
  });
});

req.on('error', (e) => {
  console.error(`❌ Request error: ${e.message}`);
});

req.write(postData);
req.end();
