let createTorrent = require('create-torrent')
var WebTorrent = require('webtorrent')
let hapi = require('./hodlong-api')
let hodlong = require('./hodlong')
const Protocol = require('bittorrent-protocol')
const net = require('net')
const cryptotic = require('cryptico');

let chain = {
    main: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906', // main network
    jungle: '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca', // jungle testnet
    sys: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f' // local developer
}
let url = 'http://127.0.0.1:8888';
let privatePassphrase = 'This is a test phrase';
let RSABits = 1024;
let privateKey = cryptotic.generateRSAKey(privatePassphrase, RSABits);
let publicKey = cryptotic.publicKeyString(privateKey);
let API = new hapi(url, chain.sys, privateKey, publicKey);



async function runTest(){
    let trackers = await API.getTrackers();
    console.log("Logging trackers:",trackers)
    let opts = {
        name: 'hodlong',
        comment: 'asset-test',
        createdBy: 'hodlong-test',
        private: true,
        rsaPubKey: pubkey,
        announceList: trackers,
        urlList: trackers
    }
    API.createUser(publicKey);

    createTorrent('./__assets__', opts, function (err, torrent) {
        if (!err) {
            // Start client for the upload seed
            var client = new WebTorrent()
            // Seed upload
            client.seed(torrent, function (torrent) {
                console.log('Client is seeding:', torrent)
                API.createStore(torrent.infoHash)
            })
            superPeerBid(torrent.infoHash)
        }
    })
}


async function superPeerBid(infoHash){
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