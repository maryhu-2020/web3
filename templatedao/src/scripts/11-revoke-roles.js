import sdk from './1-initialize-sdk.js';

const tokenModule = sdk.getTokenModule('0x16Fc14070E9fdA5f8ea8e03dA3aa3b0297d1d67e');

( async () => {
    try{
        console.log('current roles: ', await tokenModule.getAllRoleMembers());
        await tokenModule.revokeAllRolesFromAddress( process.env.WALLET_ADDRESS);
        console.log('roles after being revoked: ', await tokenModule.getAllRoleMembers());
        console.log("✅ Successfully revoked our superpowers from the ERC-20 contract");
    }catch(error){
        console.error('failed to revoke roles from the governance token creator (the superpwoer)', error);
    }

})();

/*
current roles:  {
  admin: [ '0x9164eEBC2abe52d136d4D44f61253Ae4be21fb48' ],
  minter: [
    '0x9164eEBC2abe52d136d4D44f61253Ae4be21fb48',
    '0x4091cbe3f14de91a9A302E70F8AD07FCf116FbC8'
  ],
  pauser: [ '0x9164eEBC2abe52d136d4D44f61253Ae4be21fb48' ],
  transfer: [ '0x9164eEBC2abe52d136d4D44f61253Ae4be21fb48' ]
}
roles after being revoked:  {
  admin: [],
  minter: [ '0x4091cbe3f14de91a9A302E70F8AD07FCf116FbC8' ],
  pauser: [],
  transfer: []
}
✅ Successfully revoked our superpowers from the ERC-20 contract
*/