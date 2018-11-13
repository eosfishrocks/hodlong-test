let { Api, JsonRpc, RpcError, JsSignatureProvider } = require('eosjs');
let fetch = require('node-fetch');
let { TextDecoder, TextEncoder } = require('text-encoding');
let createTorrent = require('create-torrent')
let WebTorrent = require('webtorrent')


class HAPI {
    constructor(endpoint, chain, accountName, eosPrivateKey, rsaPrivKey, rsaPubKey){
        this._endpoint = endpoint;
        this._chain = chain;
        this._accountName = accountName;
        this._privateKey = eosPrivateKey;
        this._rsaPubKey = rsaPubKey;
        this._rsaPrivKey = rsaPrivKey;
        this._contractInfo = {
            'hodlong': 'hodlong',
            'trackers': 'trackers'
        };
        this._trackers = [];
        this.signatureProvider = new JsSignatureProvider([this._privateKey]);
        this.rpc = new JsonRpc('http://127.0.0.1:8888', { fetch });
        this.api = new Api({ rpc: this.rpc, signatureProvider: this.signatureProvider});
    }

    async getTrackers() {
        await this.rpc.get_table_rows({
            code: this._contractInfo['trackers'],
            scope: this._contractInfo['trackers'],
            table: 'wtrackers',
            json: true

        }).then(data => {
            if (data) {
                data.rows.forEach((tracker) => {
                    this._trackers.push(tracker.url)
                })
            }
        }).catch(e => {
            console.error(e);
        });

        return this._trackers
    }

    async createStore(torrent) {
        await this._eos.transaction({
            actions: [
                {
                    account: this._contractInfo['marketplace'],
                    name: 'marketplace',
                    authorization: [{
                        actor: this._account_name,
                        permission: 'active'
                    }],
                    data: {
                        storage: {
                            account: this._account_name,
                            filename: torrent.infoHash,
                            filesize: torrent.length * torrent.pieceLength + torrent.lastPieceLength,
                            checksum: torrent._hashes[0]
                        }
                    }
                }
            ]
        })
    }

    async getSeededObjects(account) {
        await this._eos.getTableRows({
            code: this._contractInfo['users'],
            scope: this._contractInfo['users'],
            table: 'storage',
            json: true
        }).then(data => {
            if (data) {
                data.rows.forEach((tracker) => {
                    this._trackers.push(tracker.url)
                })
            }
        }).catch(e => {
            console.error(e);
        });
        return this._seeds
    }

    processStorageObjects(data, seededObjs){
        if (seededObjs){

        }
    }
    async getActivePeers(account) {
        await this._eos.getTableRows({
            code: this._contractInfo['users'],
            scope: this._contractInfo['users'],
            table: 'storage',
            json: true
        }).then(data => {
            if (data) {
                data.rows.forEach((tracker) => {
                    this._trackers.push(tracker.url)
                })
            }
        }).catch(e => {
            console.error(e);
        });
        return this._seeds
    }

    processStorageObjects(data, seededObjs){
        if (seededObjs){

        }
    }
    async getPubkeys(account) {
        await this._eos.getTableRows({
            code: this._contractInfo['users'],
            scope: this._contractInfo['users'],
            table: 'pubkey',
            json: true
        }).then(data => {
            if (data) {
                data.rows.forEach((tracker) => {
                    this._trackers.push(tracker.url)
                })
            }
        }).catch(e => {
            console.error(e);
        });
        return this._seeds
    }

    processStorageObjects(data, seededObjs){
        if (seededObjs){

        }
    }

    async createUser(account_name, pubKey){
        (async () => {
            const result = await this.api.transact({
                actions: [{
                    account: this._contractInfo['hodlong'],
                    name: 'adduser',
                    authorization: [{
                        actor: account_name,
                        permission: 'active',
                    }],
                    data: {
                        account: account_name,
                        pub_key: pubKey
                    },
                }]
            }, {
                blocksBehind: 3,
                expireSeconds: 30,
            });
            console.dir(result);
        })();
    }

    async createObject(path, name, comment){
        let trackers = await this.getTrackers();
        let opts = {
            name: name,
            comment: comment,
            createdBy: this._eos.getAccount('_self'),
            private: true,
            rsaPubKey: pubkey,
            announceList: trackers,
            urlList: trackers
        }
        await createTorrent(path, opts, function (err, torrent) {
            if (!err) {
                // Start client for the upload seed
                var client = new WebTorrent()
                // Seed upload
                client.seed(torrent, function (torrent) {
                    this.createStore(torrent.infoHash)
                })
            }
        })
    }

}

module.exports = HAPI;