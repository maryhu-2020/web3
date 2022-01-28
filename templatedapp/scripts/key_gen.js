const nacl = require('tweetnacl');

const generateKey = () => {
    const seed = nacl.randomBytes(32);
    const keyPair = nacl.sign.keyPair.fromSeed(seed);
    const publicKey = keyPair.publicKey;
    const secretKey = keyPair.secretKey;

    var signingKey = new Uint8Array(32);
    for (var i = 0; i < 32; i++) 
        signingKey[i] = secretKey[i];

    console.log('public key --> '+Buffer.from(publicKey, 'base64').toString('hex'));
    console.log('private key --> '+Buffer.from(signingKey, 'base64').toString('hex')); 
}

generateKey();




