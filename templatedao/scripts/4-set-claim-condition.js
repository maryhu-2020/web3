import {BigNumber} from 'ethers';
import sdk from './1-initialize-sdk.js';
import dotenv from 'dotenv';

dotenv.config();

const bundleDrop = sdk.getBundleDropModule(process.env.THIRDWEB_DROP_ID);

(async() =>{
    try{
           const claimConditionFactort = bundleDrop.getClaimConditionFactory();
           claimConditionFactort.newClaimPhase({
               startTime:new Date(),
               maxQuantity: BigNumber.from(process.env.THIRDWEB_DROP_MEMBERSHIP_NFT_MAX_QUANTITY), 
               maxQuantityPerTransaction:BigNumber.from(process.env.THIRDWEB_DROP_MEMBERSHIP_NFT_MAX_PER_TRANSACTION),
           });

           await bundleDrop.setClaimCondition(0, claimConditionFactort);
           console.log('successfully set claim condition');

    }catch(error){
        console.log('failed to set claim condition', error);
    }
})()