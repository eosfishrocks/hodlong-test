var createTorrent = require('create-torrent')
var fs = require('fs')

createTorrent('./assets/Images/daylight-desert-drought-459319.jpg', function (err, torrent) {
    if (!err) {
        // `torrent` is a Buffer with the contents of the new .torrent file
        fs.writeFile('./my.torrent', torrent)
    }
})