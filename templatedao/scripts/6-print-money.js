import {ethers} from 'ethers';
import sdk from './1-initialize-sdk.js';

const tokenModule = sdk.getTokenModule('0x16Fc14070E9fdA5f8ea8e03dA3aa3b0297d1d67e');

(async ()=>{
    try{
        const amount = 1_000_000;
        const amountWith18Decimal = ethers.utils.parseUnits(amount.toString(), 18);
        await tokenModule.mint(amountWith18Decimal);
        const totalSupply = await tokenModule.totalSupply();
        console.log('😻🔥🚀 there are now ',ethers.utils.formatUnits(totalSupply,18), '$Nikki in circulating..');
    }catch(error){
        console.log(' failed to print money', error);
    }

})()