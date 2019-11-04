const assert = require('assert');

const EIP681Parser = require('./index').default;

const eip681Parser = new EIP681Parser();

const testLabel = (msg) => console.log('\x1b[36m%s\x1b[0m', `\n${msg}\n`);
testLabel('Parse txData from url');

let txData = eip681Parser.parseTest(
  'ethereum:0x89205a3a3b2a69de6dbf7f01ed13b2108b2c43e7/pay?uint256=1&address=0x8e23ee67d1332ad560396262c48ffbb01f93d052&uint256=2&uint256=3'
);

console.log(txData);
assert(txData);

testLabel('Create transaction from url');

let unsignedTx = eip681Parser.createTxTest(
  'ethereum:0x89205a3a3b2a69de6dbf7f01ed13b2108b2c43e7/pay?uint256=1&address=0x8e23ee67d1332ad560396262c48ffbb01f93d052&uint256=2&uint256=3&value=10000000&gasPrice=1000000000&gasLimit=90000',
  1
);

console.log(unsignedTx);
assert(unsignedTx);
testLabel('Create transaction from fallback method url');

let data = eip681Parser.parse(
  'ethereum:0x89205a3a3b2a69de6dbf7f01ed13b2108b2c43e7?uint256=1&address=0x8e23ee67d1332ad560396262c48ffbb01f93d052&uint256=2&uint256=3&value=10000000&gasPrice=1000000000&gasLimit=90000',
  1
);

// txData[0..8] should be 00000000
console.log(data);
assert(data);