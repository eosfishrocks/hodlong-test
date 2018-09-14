let createTorrent = require('create-torrent')
var WebTorrent = require('webtorrent')

let hapi = require('./hodlong-api')

let chain = {
    main: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906', // main network
    jungle: '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca', // jungle testnet
    sys: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f' // local developer
}
let url = 'http://127.0.0.1:8888'
let privateKey= ''

api = new hapi(url, chain.sys, privateKey)

async function runTest(){
    let trackers = await api.getTrackers();

    let opts = {
        name: 'hodlong-test',
        comment: 'asset-test',
        createdBy: 'hodlong-test',
        private: true,
        announceList: trackers,
        urlList: trackers
    }

    createTorrent('./__assets__', function (err, torrent) {
        if (!err) {
            // Start client for the upload seed
            var client = new WebTorrent()
            // Seed upload
            client.seed(torrent, function (torrent) {
                console.log('Client is seeding:', torrent)
                api.createStore(torrent.infoHash)
            })



        }
    })
}

runTest()