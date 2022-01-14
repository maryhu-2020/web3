import { ethers } from "ethers";
import sdk from './1-initialize-sdk.js'

const tokenModule = sdk.getTokenModule('0x16Fc14070E9fdA5f8ea8e03dA3aa3b0297d1d67e');
const votingModule = sdk.getVoteModule('0x4091cbe3f14de91a9A302E70F8AD07FCf116FbC8');

( async() => {
    try{
        await tokenModule.grantRole("minter", votingModule.address);
        console.log('succesfully grant VotingModule the minter role of the governance token' );
    }catch(error){
        console.error('faild to grant VotingModule the minter role of the governance token' );
        process.exit(1);
    }

    try{
        const ownedTokenBalance = await tokenModule.balanceOf( process.env.WALLET_ADDRESS);
        console.log('ownedTokenBalance: ', ownedTokenBalance );
        const ownedAmount = ethers.BigNumber.from( ownedTokenBalance.value);
        console.log('ownedAmount: ', ownedAmount );
        const percent90 = ownedAmount.div(100).mul(9);

        await tokenModule.transfer(votingModule.address, percent90 );
        console.log('successfully transferred token');
    }catch(error){
        console.error('failed to transfer token', error);
    }

} )();
