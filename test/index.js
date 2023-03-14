const test = require('ava');
const path = require('path');
require(path.join(process.cwd(), 'production.js'));

test('first test.js', t => {
  const indexModel = think.model('index');
})
