const ethUrlParser = require('./eth-url-parser');
const ethereumjsABI = require('ethereumjs-abi');
const EthereumTx = require('ethereumjs-tx').Transaction;

const ReservedParams = [
  'value',
  'gas',
  'gasLimit',
  'gasPrice'
];

class EIP681Parser {
  parseTest(url) {
    let parsedUrl = ethUrlParser.parse(url);
    let typedParams = Object.values(parsedUrl.parameters).filter((param) => {
      return !ReservedParams.includes(param.key);
    });
    let types = typedParams.map(p => p.key);
    let selector = ethereumjsABI.methodID(
      parsedUrl.parameters.function_name,
      types
    );
    let encodedValues = typedParams.map(param => {
      return ethereumjsABI.rawEncode([param.key], [param.val]);
    });
    let txData = '0x' + Buffer.concat([
      selector,
      ...encodedValues
    ]).toString('hex');
    return {
      ...parsedUrl,
      types,
      selector,
      encodedValues,
      txData
    };
  }

  createTxTest(url, nonce) {
    let obj = this.parseTest(url);
    let txParams = {
      nonce,
      to: obj.target_address,
      data: obj.txData
    };
    let parameters = Object.values(obj.parameters);

    let gasPrice = parameters.find((p) => {
      return p.key === 'gasPrice' && p.val;
    });
    if (gasPrice) {
      txParams.gasPrice = gasPrice.val;
    }

    let gasLimit = parameters.find((p) => {
      return (p.key === 'gasLimit' || p.key === 'gas') && p.val;
    });
    if (gasLimit) {
      txParams.gasLimit = gasLimit.val;
    }

    let value = parameters.find((p) => {
      return p.key === 'value' && p.val;
    });
    if (value) {
      txParams.value = value.val;
    }

    if (
      !txParams.nonce ||
      !txParams.gasPrice ||
      !txParams.gasLimit ||
      !txParams.to ||
      !txParams.value ||
      !txParams.data
    ) {
      throw new Error('Missing required params for tx creation');
    }

    let unsignedTx = new EthereumTx(txParams);

    return {
      ...obj,
      txParams,
      unsignedTx: unsignedTx.serialize().toString('hex')
    };
  }

  /**
   * @name parse
   * @description convert eip681 url to transaction data
   * @param {String} url
   * @returns {String} unsignedTx
   */
  parse(url) {
    return this.parseTest(url).txData;
  }

  /**
   * @name createTx
   * @description convert eip681 url to an unsigned eth transaction
   * @param {String} url
   * @param {Number} nonce
   * @returns {String} unsignedTx
   */
  createTx(url, nonce) {
    return this.createTxTest(url, nonce).unsignedTx;
  }
}

module.exports.default = EIP681Parser;