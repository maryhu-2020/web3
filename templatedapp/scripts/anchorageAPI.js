const nacl = require('tweetnacl');
nacl.util = require('tweetnacl-util');

const generateKey = () => {
    const seed = nacl.randomBytes(32);
    const keyPair = nacl.sign.keyPair.fromSeed(seed);
    const publicKey = keyPair.publicKey;
    const secretKey = keyPair.secretKey;

    var signingKey = new Uint8Array(32);
    for (var i = 0; i < 32; i++) 
        signingKey[i] = secretKey[i];

    console.log('public key --> '+Buffer.from(publicKey, 'base64').toString('hex'));    
    console.log('signing key --> '+Buffer.from(signingKey, 'base64').toString('hex')); 
    console.log('secret key --> '+secretKey); 
    console.log('secret key hex--> '+Buffer.from(secretKey, 'base64').toString('hex')); 
}

const hexStringToByteArray = (hexString) => {
    if (hexString.length % 2 !== 0) {
        throw "Must have an even number of hex digits to convert to bytes";
    }/* w w w.  jav  a2 s .  c o  m*/
    var numBytes = hexString.length / 2;
    var byteArray = new Uint8Array(numBytes);
    for (var i=0; i<numBytes; i++) {
        byteArray[i] = parseInt(hexString.substr(i*2, 2), 16);
    }
    return byteArray;
}

const sign = () =>{
    const secretKeyHex = '33647caf0dd29b1e76be1c99414b33f72cfdc1455f82a201ae1fe29c309daaac8762eace8a9203f58988fc6b62bc7edb4dd70c9b51791e60d2516a2d5f27c0ff';
    const secretKey = hexStringToByteArray(secretKeyHex);
    
    const timestamp = '1577880000';
    const method = 'POST';
    const httpPath = '/v2/transfers?foo=bar&baz=bang';
    const requestBody = '{"source": {"id": "1c920f4241b78a1d483a29f3c24b6c4c", "type": "VAULT"}, "assetType": "ETH", "destination": {"id": "55e89d4a644d736b01533a2ea9b32a20", "type": "VAULT"}, "amount": "1000.00000000"}';
    const msgStr = timestamp + method + httpPath + requestBody;
    const msgDecoded = nacl.util.decodeUTF8(msgStr);
    
    const signature = nacl.sign.detached(msgDecoded, secretKey);
    const signatureHex = Buffer.from(signature, 'base64').toString('hex');
    console.log('signature->'+signatureHex);

}

sign();
//generateKey();


