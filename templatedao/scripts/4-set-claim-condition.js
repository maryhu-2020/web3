import sdk from './1-initialize-sdk.js';

const bundleDrop = sdk.getBundleDropModule('0x7615B5989Ff340324D894497D277C67aF4D75437');

(async() =>{
    try{
           const claimConditionFactort = bundleDrop.getClaimConditionFactory();
           claimConditionFactort.newClaimPhase({
               startTime:new Date(),
               maxQuantity:5_000, 
               maxQuantityPerTransaction:1,
           });

           await bundleDrop.setClaimCondition(0, claimConditionFactort);
           console.log('✅ successfully set claim condition');

    }catch(error){
        console.log('🤬 failed to set claim condition', error);
    }
})()