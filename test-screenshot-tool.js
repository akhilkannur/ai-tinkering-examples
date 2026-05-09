const capture = require('./scripts/capture-screenshot.js');
async function test() {
  console.log('Testing Screenshot Engine...');
  await capture('https://example.com', 'test-capture.png');
}
test();
