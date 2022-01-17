import { ethers } from "ethers";
import sdk from './1-initialize-sdk.js'

const tokenModule = sdk.getTokenModule(process.env.THIRDWEB_DROP_GOVERNANCE_TOKEN_ID);
const votingModule = sdk.getVoteModule(process.env.THIRDWEB_VOTING_CONTRACT_ID);

( async() => {
    try{
        await tokenModule.grantRole("minter", votingModule.address);
        console.log('succesfully grant VotingModule the minter role of the governance token' );
    }catch(error){
        console.error('faild to grant VotingModule the minter role of the governance token' );
        process.exit(1);
    }

    try{
        const ownedTokenBalance = await tokenModule.balanceOf( process.env.WALLET_ADDRESS_MUMBAI);
        console.log('ownedTokenBalance: ', ownedTokenBalance );
        const ownedAmount = ethers.BigNumber.from( ownedTokenBalance.value);
        console.log('ownedAmount: ', ownedAmount );
        const percent = ownedAmount.div(100).mul(ethers.BigNumber.from(process.env.THIRDWEB_VOTING_OWNED_PERCENTAGE));

        await tokenModule.transfer(votingModule.address, percent);
        console.log('successfully transferred token');
    }catch(error){
        console.error('failed to transfer token', error);
    }

} )();
