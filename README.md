# eip681parser

A parser that takes in an eip681 url, and does anything from serialize tx.data to broadcasting a signed tx.

eip681 makes it possible to tell wallets exact parameters for any contract call (not just standards / known ABIs), yet current npm packages have erc20-specific code. Likewise, most wallets either have no support, or partial support (coinbase wallet). This lib aims to fully implement parsing, so that wallet devs just have to connect it to their existing provider.

## Usage

`parse(url)` - convert eip681 url to transaction data.

`createTx(url, nonce)` - convert eip681 url to an unsigned eth transaction. Expects url to contain all required params for constructing a tx (except nonce), otherwise it will throw.

TODO:

`createTx(url, web3Provider)` - convert eip681 url to an unsigned eth transaction, filling in values from web3Provider for nonce, gasPrice, and gasLimit.

## Testing

To test, run the following:

`npm i`

`npm test`

## Credits

Based on a modified version of [eth-url-parser](https://www.npmjs.com/package/eth-url-parser), minus ABI-specific logic (erc20 transfer amount validation, 'pay-' prefix), and changing the `parameters` object to preserve ordering of typed params (necessary for computing function signature).

Using utils by [ethereum-js](ethereumjs).
