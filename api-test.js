let  Hodlong, HAPI= require('hodlong')

const Protocol = require('bittorrent-protocol')
const net = require('net')
const cryptico = require('cryptico');
const fetch = require('node-fetch');
let { JsSignatureProvider }= require('eosjs');

let privatePassphrase = 'This is a test phrase';
let RSABits = 1024;
let rsaPrivKey = cryptico.generateRSAKey(privatePassphrase, RSABits);
let eosPrivateKey =  '5HszuhxF7Jk51USzNP2XD7h4RsCKf99jPsJ2tREm4buP55X9mxx';


let signatureProvider = new JsSignatureProvider([eosPrivateKey]);

let opts = {
    contractInfo: {hodlong: 'hodlong', trackers:'trackers'},
    endpoint: 'http://127.0.0.1:8888',
    account_name: 'usera',
    rsaPrivateKey: rsaPrivKey,
    signatureProvider: signatureProvider
}
let hapi = new HAPI(opts);


async function runTest(){
    //hapi.getPublicKey("usera");
    console.log(await hapi.getPublicKey('usera'));
}

runTest()