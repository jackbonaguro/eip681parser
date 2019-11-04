# eip681parser

A parser that takes in an eip681 url, and does anything from serialize tx.data to broadcasting a signed tx.

If the goal of eip681 is to encode any possible contract function call, it must work for unknown ABIs/standards.

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
