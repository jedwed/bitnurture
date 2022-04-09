const CryptoJS = require('crypto-js')

const email = "oisdf@gmail.com"
const masterPassword = "SOIfjwoeijf"

const masterKey = CryptoJS.PBKDF2(masterPassword, email, {
    iterations: 100000,
    keySize: 256 / 32,
})

const password = "sofjwpoejpwoejfpdasdff"
const iv = CryptoJS.lib.WordArray.random(128 / 8)

const encrypted = CryptoJS.AES.encrypt(password, masterKey, {
    iv: iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC
}).toString()

console.log(encrypted)


const decrypted = CryptoJS.AES.decrypt(encrypted, masterKey, {
    iv: iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC
}).toString(CryptoJS.enc.Utf8)

console.log(decrypted)


