require('dotenv').config();
const MNEMONIC = process.env.MNEMONIC;
const NETWORK_URL = process.env.NETWORK_URL;
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3'); 
const {interface, bytecode} = require('./compile');

const provider = new HDWalletProvider(
    MNEMONIC,
    NETWORK_URL
);


const web3 = new Web3(provider);

const deploy = async() => {
    const accounts = await web3.eth.getAccounts();
    console.log('Account',accounts[0]);
    const inbox = await new web3.eth.Contract(JSON.parse(interface))
            .deploy({data: bytecode, arguments: ['Hi There!']})
            .send({from: accounts[0], gas: '1000000'});

    console.log("Contract Deployed To: ", inbox.options.address);
    provider.engine.stop();
};

deploy();
