import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";
import dotenv from 'dotenv';

dotenv.config();

//ERC-1155 membership NFT contract
const bundleDropModule = sdk.getBundleDropModule(process.env.THIRDWEB_DROP_ID);

//ERC-20 Governance token contract
const tokenModule = sdk.getTokenModule(process.env.THIRDWEB_DROP_GOVERNANCE_TOKEN_ID);

(async() => {
    try{
        const walletAddress = await bundleDropModule.getAllClaimerAddresses('0');
        if( walletAddress.length === 0){
            console.warn('😹 you need some friends to claim your free NFT');
            process.exit(0); 
        }

        const airdropTargets = walletAddress.map( (address) => {
            const randomAmount = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000);
            console.log("✅ Going to airdrop", randomAmount, "tokens to", address);

            const airdropTarget = {
                address,
                amount: ethers.utils.parseUnits(randomAmount.toString(),18)
            }
            return airdropTarget;
        } );

        console.log('👍🏽 start airdropping...');
        await tokenModule.transferBatch(airdropTargets);
        console.log('🔥 air dropped tokens to all the holders of the NFT (Save Cats DAO members)');

    }catch(error){
        console.error('😡 failed to airdrop token');
    }

} )()