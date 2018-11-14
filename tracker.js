let debug = true

let port = '8080'
var Server = require('bittorrent-tracker').Server

var server = new Server({
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

var hostname = {
    http: '127.0.0.1',
}

server.listen(port, hostname, function () {

        var httpAddr = server.http.address()
        var httpHost = httpAddr.address !== '::' ? httpAddr.address : 'localhost'
        var httpPort = httpAddr.port
        console.log('HTTP tracker: http://' + httpHost + ':' + httpPort + '/announce')


        var udpAddr = server.udp.address()
        var udpHost = udpAddr.address
        var udpPort = udpAddr.port
        console.log('UDP tracker: udp://' + udpHost + ':' + udpPort)


        var udp6Addr = server.udp6.address()
        var udp6Host = udp6Addr.address !== '::' ? udp6Addr.address : 'localhost'
        var udp6Port = udp6Addr.port
        console.log('UDP6 tracker: udp://' + udp6Host + ':' + udp6Port)


        var wsAddr = server.http.address()
        var wsHost = wsAddr.address !== '::' ? wsAddr.address : 'localhost'
        var wsPort = wsAddr.port
        console.log('WebSocket tracker: ws://' + wsHost + ':' + wsPort)


        var statsAddr = server.http.address()
        var statsHost = statsAddr.address !== '::' ? statsAddr.address : 'localhost'
        var statsPort = statsAddr.port
        console.log('Tracker stats: http://' + statsHost + ':' + statsPort + '/stats')

})
