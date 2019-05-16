global.WRTC = require('wrtc')
var Hodlong = require('hodlong')
var JsSignatureProvider  = require('eosjs/dist/eosjs-jssig')
var MemoryChunkStore = require('memory-chunk-store')
const fs = require('fs')
const path = require('path')


let opts = {
    dht: true,
    endpoint: 'http://testnet.ngrok.io',
    accountName: 'usera',
    privatePassphrase: 'usera',
    signatureProvider: new JsSignatureProvider.default(['5Kc4Vt2i4v8XqFK8PbfFn15umSQ9Eeh5fjCbJjc9VqQPMgLnyJH']),
    contractInfo: {'hodlong': 'hodlong', 'trackers': 'trackers'},
}

// Create client
var client = new Hodlong(opts)

client.add('my.torrent', { store: MemoryChunkStore, tracker: true})
