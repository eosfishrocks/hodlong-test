global.WRTC = require('wrtc')
let externalFetch = require('node-fetch')

var  JsSignatureProvider= require('eosjs/dist/eosjs-jssig')
let sig = new JsSignatureProvider.default(['5KYJxK1RsnUn9xkPaJ48EhqYspxoiQbiw5oigwSqsNK66PQhrgs'])
const { TextEncoder, TextDecoder } = require('util');
var Hodlong = require('hodlong')

var MemoryChunkStore = require('memory-chunk-store')
const fs = require('fs')
const path = require('path')

let hapi_opts = {
    dht: true,
    endpoint: 'http://testnet.ngrok.io',
    accountName: 'providera',
    privatePassphrase: 'providera',
    signatureProvider: sig,
    contractInfo: {'hodlong': 'hodlong', 'trackers': 'trackers'},
    textEncoder: new TextEncoder(),
    textDecoder: new TextDecoder(),
    externalFetch: externalFetch
}
var client = new Hodlong(hapi_opts)

client.on('torrent', function (torrent) {
    // torrent metadata has been fetched -- sanity check it
    let torrent_path = path.join('./SSM-TracksuitExitEdited.mp4')
    torrent.load(fs.createReadStream(torrent_path), function (err) {
        console.log(err)
    })
})

client.add('my.torrent', { store: MemoryChunkStore, tracker: true})
