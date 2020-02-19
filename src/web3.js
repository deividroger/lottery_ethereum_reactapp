import Web3 from 'web3'


const OPTIONS = {
    defaultBlock: "latest",
    transactionConfirmationBlocks: 1,
    transactionBlockTimeout: 5
  };

const web3 = new Web3(window.web3.currentProvider,null,OPTIONS);

export default web3;