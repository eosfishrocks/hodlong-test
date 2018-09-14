let EOS = require('eosjs')


class hapi {
    constructor(endpoint, chain, accountName, privateKey){
        this._endpoint = endpoint
        this._chain = chain
        this._accountName = accountName
        this._privateKey = privateKey

        this._contractInfo = {
            'marketplace': 'marketplace',
            'trackers': 'trackers'
        }
        this._trackers = []
        this._eos = EOS({
            httpEndpoint: this._endpoint,
            chain: this._chain
        })
    }

    async getTrackers() {

        await this._eos.getTableRows({
            code: this._contractInfo['trackers'],
            scope: this._contractInfo['trackers'],
            table: 'tracker',
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

    async createStore(infoHash) {
        await this._eos.contract(this._contractInfo['marketplace']).then((contract) => {
            contract.createobj("child.acnt",{authorization:['child.acnt']}).then((res) => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
        })
    }
}

module.exports = hapi