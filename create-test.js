var createTorrent = require('create-torrent')

var fs = require('fs')
opts = {
    name: "demosite.html",
        comment: "Test of Hodlong",
    createdBy: "Test",
    private: false,
    announceList: [["ws://dev.hodlong.com:8080"]]
}
createTorrent('/hodlong/demosite.html', opts,function (err, torrent) {
    if (!err) {
        // `torrent` is a Buffer with the contents of the new .torrent file
        fs.writeFile('./demosite.torrent', torrent, () => {})
    }
})
