var cryptico = require('cryptico')


let privatePassphrase1 = 'providera'
let privatePassphrase2 = 'userb'


let info_hash="userb"
let RSABits = 1024

let rsaPrivateKey1 = cryptico.generateRSAKey(privatePassphrase1, RSABits)
let rsaPublicKey1 = cryptico.publicKeyString(rsaPrivateKey1)
let rsaPrivateKey2 = cryptico.generateRSAKey(privatePassphrase2, RSABits)
let rsaPublicKey2 = cryptico.publicKeyString(rsaPrivateKey2)


let encrypted = cryptico.encrypt(info_hash, rsaPublicKey2, rsaPrivateKey1).cipher



console.log(rsaPublicKey1)

let decrypted = cryptico.decrypt(encrypted, rsaPrivateKey2)


