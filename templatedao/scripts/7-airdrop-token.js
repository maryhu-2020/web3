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
        const claimedAddresses = await bundleDropModule.getAllClaimerAddresses('0');
        if( claimedAddresses.length === 0){
            console.warn('there is no one claimed to be a member yet');
            process.exit(0); 
        }

        const airdropTargets = claimedAddresses.map( (address) => {
            const airdropAmount = process.env.THIRDWEB_DROP_GOVERNANCE_TOKEN_AIRDROP_AMOUNT;
            console.log("Going to airdrop", airdropAmount, "tokens to", address);

            const airdropTarget = {
                address,
                amount: ethers.utils.parseUnits(airdropAmount.toString(),18)
            }
            return airdropTarget;
        } );

        await tokenModule.transferBatch(airdropTargets);
        console.log('airdropped tokens to all the holders of the membership NFT');

    }catch(error){
        console.error('😡 failed to airdrop token');
    }

} )()