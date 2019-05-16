var Hodlong = require('hodlong')

var client1 = new Hodlong({
    tracker: true,
    dht: true,
    endpoint: '127.0.0.1',
    signatureProvider: '',
    rsaPrivateKey: rsaPrivateKey,
    contractInfo: { 'hodlong': 'hodlong', 'trackers': 'trackers' }
})

client1.add('b2a79be6df5e1535c18d4d424a818433fb67f5ac')
