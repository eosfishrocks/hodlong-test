var WebTorrent = require('webtorrent')
let HAPI = require('./hodlong-api')
let utHodlong = require('./ut_hodlong')
const Protocol = require('bittorrent-protocol')
const net = require('net')
const cryptico = require('cryptico');


let eosPrivateKey = '5JwEKmsSqRBX2rSHWvP3aavcxWPwTjQtNgfx3BbHTSRJDtnfSjS';

let url = 'http://127.0.0.1:8888';
let privatePassphrase = 'This is a test phrase';
let RSABits = 1024;
let account_name='usera';
let privateKey = cryptico.generateRSAKey(privatePassphrase, RSABits);
let publicKey = cryptico.publicKeyString(privateKey);
let api = new HAPI(url,  account_name, eosPrivateKey, privateKey, publicKey);



async function runTest(){
    api.createObject('./__assets__', "Hodlong-Test")

}


async function superPeerBid(infoHash){
    net.createServer(socket => {
        const wire = new Protocol()
        // Pull valid keys from contract
        socket.pipe(wire).pipe(socket)
        wire.use(ut_hodlong())
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