var WebTorrent = require('webtorrent')
let HAPI = require('./hodlong-api')
let hodlong = require('./hodlong')
const Protocol = require('bittorrent-protocol')
const net = require('net')
const cryptotic = require('cryptico');

let chain = {
    main: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906', // main network
    jungle: '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca', // jungle testnet
    sys: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f' // local developer
}
let eosPrivateKey = '5JwEKmsSqRBX2rSHWvP3aavcxWPwTjQtNgfx3BbHTSRJDtnfSjS';

let url = 'http://127.0.0.1:8888';
let privatePassphrase = 'This is a test phrase';
let RSABits = 1024;
let account_name='user';
let privateKey = cryptotic.generateRSAKey(privatePassphrase, RSABits);
let publicKey = cryptotic.publicKeyString(privateKey);
let api = new HAPI(url, chain.sys, account_name, eosPrivateKey, privateKey, publicKey);



async function runTest(){
    api.createUser('user', publicKey);
}


async function superPeerBid(infoHash){
    api.createObject('./__assets__', "Hodlong-Test")
    net.createServer(socket => {
        const wire = new Protocol()
        // Pull valid keys from contract
        socket.pipe(wire).pipe(socket)
        wire.use(hodlong())
        wire.ut_hodlong.fetch()
        wire.ut_hodlong.on('stats', stats => {
            // Check key
        })
        wire.ut_hodlong.on('warning', err => {
            console.log(err.message)
        })
        wire.on('handshake', (infoHash, peerId) => {
            wire.handshake(new Buffer(infoHash), new Buffer(peerId))
        })
    }).listen(6881)
}

runTest()