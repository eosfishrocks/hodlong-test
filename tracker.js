let debug = true
let DHT = require('bittorrent-dht')
let port = '8080'
let Server = require('bittorrent-tracker').Server

let server = new Server({
    udp: true, // enable udp server? [default=true]
    http: true, // enable http server? [default=true]
    ws: true, // enable websocket server? [default=true]
    stats: true, // enable web-based statistics? [default=true]
})


server.on('error', function (err) {
    console.error('ERROR: ' + err.message)
})
server.on('warning', function (err) {
    if (debug) console.log('WARNING: ' + err.message)
})
server.on('update', function (addr) {
    if (debug) console.log('update: ' + addr)
})
server.on('complete', function (addr) {
    if (debug) console.log('complete: ' + addr)
})
server.on('start', function (addr) {
    if (debug) console.log('start: ' + addr)
})
server.on('stop', function (addr) {
    if (debug) console.log('stop: ' + addr)
})

let hostname = {
    http: 'dev.hodlong.com',
}

server.listen(port, hostname, function () {

        let httpAddr = server.http.address()
        let httpHost = httpAddr.address !== '::' ? httpAddr.address : 'localhost'
        httphost = hostname
        let httpPort = httpAddr.port
        console.log('HTTP tracker: http://' + httpHost + ':' + httpPort + '/announce')


        let udpAddr = server.udp.address()
        let udpHost = udpAddr.address
        let udpPort = udpAddr.port
        udphost = hostname
        console.log('UDP tracker: udp://' + udpHost + ':' + udpPort)


        let udp6Addr = server.udp6.address()
        let udp6Host = udp6Addr.address !== '::' ? udp6Addr.address : 'localhost'
        let udp6Port = udp6Addr.port
        console.log('UDP6 tracker: udp://' + udp6Host + ':' + udp6Port)


        let wsAddr = server.http.address()
        let wsHost = wsAddr.address !== '::' ? wsAddr.address : 'localhost'
        let wsPort = wsAddr.port

        console.log('WebSocket tracker: ws://' + wsHost + ':' + wsPort)


        let statsAddr = server.http.address()
        let statsHost = statsAddr.address !== '::' ? statsAddr.address : 'localhost'
        let statsPort = statsAddr.port
        console.log('Tracker stats: http://' + statsHost + ':' + statsPort + '/stats')

        let dhtServer = new DHT({ bootstrap: false, debug: true })
        dhtServer.on('error', function (err) { t.fail(err) })
        dhtServer.on('warning', function (err) { t.fail(err) })
        dhtServer.listen()

})

