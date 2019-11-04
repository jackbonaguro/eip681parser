# eip681parser

A parser that constructs a raw ethereum transaction from an eip681 url.

Based on a modified version of [eth-url-parser](https://www.npmjs.com/package/eth-url-parser), and using utils by [ethereum-js](ethereumjs).

## Usage

`parse(url)` convert eip681 url to transaction data

`createTx(url, nonce)` convert eip681 url to an unsigned eth transaction

## Testing

To test, run the following:

`npm i`

`npm test`
