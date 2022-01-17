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