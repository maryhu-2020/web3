import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";
import dotenv from 'dotenv';

dotenv.config();

//ERC-1155 membership NFT contract
const bundleDropModule = sdk.getBundleDropModule(process.env.THIRDWEB_DROP_ID);

//ERC-20 Governance token contract
const token = sdk.getTokenModule(process.env.THIRDWEB_DROP_GOVERNANCE_TOKEN_ID);

( async() =>{
    try{
        console.log('bundleDropModule address: ', bundleDropModule.address);
        /*
        const claimedAddresses = await bundleDropModule.getAllClaimerAddresses('0');
        if( claimedAddresses.length === 0){
            console.warn('there is no one claimed to be a member yet');
            process.exit(0); 
        }
        console.log('claimedAddresses length: ', claimedAddresses.length);

        const allholders = await token.getAllHolderBalances();
        console.log('allholders: ', allholders);
        */

        bundleDropModule.getAllClaimerAddresses('0').then((addresess) => {
          console.log("🚀 Members addresses", addresess);
          //setMemberAddresses(addresess);
        })
        .catch((err) => {
          console.error("failed to get member list", err);
        });

    }catch(error){
        console.error('error:', error);
    }

}  )();

/*
  THIRDWEB_DROP_GOVERNANCE_TOKEN_TOTAL_SUPPLY=1000000
  THIRDWEB_DROP_GOVERNANCE_TOKEN_AIRDROP_AMOUNT=400

  1.
  0xf74c875D6552a016c3C6c9E784b56e11BE13ec1B
  1000000.0 TDGT

  2. airdrop
    --> 0xe9c801270aa661583829486fd99c325ae0311e9f: 400
    --> 0x9164eebc2abe52d136d4d44f61253ae4be21fb48: 400
  0xf74c875D6552a016c3C6c9E784b56e11BE13ec1B: 999200

  3. transfer to voting module  
    --> 0xea14e56fE23a228A2188bAB6AFff6Aad843a5099: 699720
  0xf74c875D6552a016c3C6c9E784b56e11BE13ec1B: 299480


so: 
Governance token: 299480
voting module:  : 699720
member1         : 400
member2         : 400

  4. proposal transfer  

*/