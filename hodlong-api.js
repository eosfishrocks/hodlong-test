let EOS = require('eosjs')


class hapi {
    constructor(endpoint, chain, accountName, eosPrivateKey, rsaPubKey){
        this._endpoint = endpoint;
        this._chain = chain;
        this._accountName = accountName;
        this._privateKey = eosPrivateKey;
        this._rsaPubKey = rsaPubKey;
        this._contractInfo = {
            'marketplace': 'marketplace',
            'trackers': 'trackers'
        };
        this._trackers = [];
        this._eos = EOS({
            httpEndpoint: this._endpoint,
            chain: this._chain
        });
    }

    async getTrackers() {

        await this._eos.getTableRows({
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

    async createUser(pubKey){
        await this._eos.transaction({
            actions: [
                {
                    account: this._contractInfo['marketplace'],
                    name: 'users',
                    authorization: [{
                        actor: this._account_name,
                        permission: 'active'
                    }],
                    data: {
                        user: {
                            account: this._account_name,
                            pub_key: pubKey
                        }
                    }
                }
            ]
        })
    }

}

module.exports = hapi