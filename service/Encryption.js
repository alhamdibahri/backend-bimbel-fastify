
const Crypto = require('crypto');

const Key = Buffer.from(process.env.APP_KEY, 'base64')//crypto.randomBytes(32);
const Method = 'aes-256-cbc';
const Algo = 'sha256';

function encrypt(plain) {
    const iv = base64().encoding(Crypto.randomBytes(16));
    const cipher = Crypto.createCipheriv(Method, Key, iv);
    const value = cipher.update(getStringPlain(plain), 'utf8', 'base64') + cipher.final('base64');
    var mac = hash(iv.toString('base64'), value, Key);
    return new base64().encode(JSON.stringify({
        iv: iv.toString('base64'),
        value: value,
        mac: mac.toString('hex')
    }));
}

function decrypt(payload) {
 /*   try {*/
        payload = getJsonPayload(payload);
        const decipher = Crypto.createDecipheriv(Method, Key, base64().encoding(payload.iv));
        let plain = decipher.update(payload.value, 'base64', 'utf8') + decipher.final('utf8');
        plain = unserialize(plain);
        return JSON.parse(base64().decode(plain));
/*    }catch (e) {
       throw new Error('asdsaaddasd');
    }*/

}


function getStringPlain(plain){
    return serialize(base64().encode(JSON.stringify(plain)));
}

function base64() {
    return  {
        encode(val) {
            return new Buffer.from(val).toString('base64')
        },
        decode(val){
            return new Buffer.from(val, 'base64').toString('ascii')
        },
        encoding(val){
            return new Buffer.from(val, 'base64')
        }
    }
}

function unserialize(text) {
     text = text.toString();
    return text.substring(text.lastIndexOf(':')+1,text.lastIndexOf(""));
}

function serialize(text) {
    text = text.toString();
    return 's:'+text.length+':"'+text+'"';
}

function getJsonPayload(cipher) {
    var payload = JSON.parse(base64().encoding(cipher, 'base64'));

    if (!validPayload(payload)) {
        throw new Error('The payload is invalid.');
    }

    if (!validMac(payload)) {
        throw new Error('The MAC is invalid.');
    }

    return payload;
}

function hash(iv, value, key) {
    return getHmac(iv + value, key);
}

function validMac(payload) {
    var bytes = Crypto.randomBytes(16);

    return calculateMac(payload, bytes, Key).toString('hex') === getHmac(payload.mac, bytes).toString('hex');
}

function calculateMac(payload, bytes, key) {
    return getHmac(hash(payload.iv, payload.value, key).toString('hex'), bytes);
}

function getHmac(data, key) {
    var sha = Crypto.createHmac(Algo, key);
    sha.update(data.toString());

    return sha.digest();
}

function validPayload(object) {
    return typeof object === 'object' && object.hasOwnProperty('iv') && object.hasOwnProperty('value') && object.hasOwnProperty('mac');
}

module.exports = {
    decrypt, encrypt, base64
};