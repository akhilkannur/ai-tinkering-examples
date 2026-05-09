const https = require('https');

const LOGIN = 'akhil@lisnagency.online';
const PASS = 'b3fc3ef0fccdde5b';
const TARGET = 'realaiexamples.com';

const postData = JSON.stringify([
  {
    target: TARGET
  }
]);

const options = {
  hostname: 'api.dataforseo.com',
  path: '/v3/backlinks/summary/live',
  method: 'POST',
  headers: {
    'Authorization': 'Basic ' + Buffer.from(LOGIN + ':' + PASS).toString('base64'),
    'Content-Type': 'application/json',
    'Content-Length': postData.length
  }
};

console.log(`🔍 Fetching backlink summary for ${TARGET}...`);

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
        console.log('\n📊 BACKLINK SUMMARY');
        console.log('----------------------------');
        console.log(`Target:         ${result.target}`);
        console.log(`Rank:           ${result.rank}`);
        console.log(`Backlinks:      ${result.backlinks}`);
        console.log(`Ref. Domains:   ${result.referring_domains}`);
        console.log(`Ref. IPs:       ${result.referring_ips}`);
        console.log(`Ref. Pages:     ${result.referring_pages}`);
        console.log('----------------------------\n');
      } else {
        console.error('❌ API Error:', response.status_message);
      }
    } catch (e) {
      console.error('❌ Failed to parse response:', e.message);
      console.log('Raw data:', data);
    }
  });
});

req.on('error', (e) => {
  console.error(`❌ Request error: ${e.message}`);
});

req.write(postData);
req.end();
