import {ethers} from 'ethers';
import sdk from './1-initialize-sdk.js';
import dotenv from 'dotenv';

dotenv.config();

const tokenModule = sdk.getTokenModule(process.env.THIRDWEB_DROP_GOVERNANCE_TOKEN_ID);

(async ()=>{
    try{
        const amount = process.env.THIRDWEB_DROP_GOVERNANCE_TOKEN_TOTAL_SUPPLY;
        const amountWith18Decimal = ethers.utils.parseUnits(amount, 18);
        await tokenModule.mint(amountWith18Decimal);
        const totalSupply = await tokenModule.totalSupply();
        console.log('there are ',ethers.utils.formatUnits(totalSupply,18), 'governance tokens just minted. they will be in circulating..');
    }catch(error){
        console.log(' failed to print money', error);
    }

})()