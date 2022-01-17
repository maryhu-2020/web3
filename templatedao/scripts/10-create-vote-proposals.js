import { ethers } from "ethers";
import sdk from './1-initialize-sdk.js';

const tokenModule = sdk.getTokenModule(process.env.THIRDWEB_DROP_GOVERNANCE_TOKEN_ID);
const votingModule = sdk.getVoteModule(process.env.THIRDWEB_VOTING_CONTRACT_ID);

( async () => {
    try{
        const amount = 100_000;
        const proposalDescription = 'Should the DAO mint additional '+ amount +' Nikki tokens to the Treasury?';

        await tokenModule.delegateTo(process.env.WALLET_ADDRESS)  //becauase minimumNumberOfTokensNeededToPropose: '10'

        await votingModule.propose(proposalDescription,            
            // a list a excutables
            [
                {   
                    nativeTokenValue: 0,
                    transactionData: tokenModule.contract.interface.encodeFunctionData(
                        "mint",[votingModule.address, ethers.utils.parseUnits(amount.toString(), 18 ), ]
                    ),
                    toAddress: tokenModule.address,
                },
            ]);
        console.log('Successfully created proposal to mint additional tokens for our Treasury!');     
    }catch(error){
        console.error('Failed to create proposal to mint additional tokens for our Treasury! ', error);
        process.exit(1);
    }


    try{
        const bonus = 8_888;
        const proposalDescription = 'Should the DAO give '+bonus+' Nikki tokens to '+ process.env.WALLET_ADDRESS +' as year end bonus?';

        await votingModule.propose( proposalDescription, 
            [   
                {
                    nativeTokenValue: 0,
                    transactionData: tokenModule.contract.interface.encodeFunctionData(
                        "transfer", [ process.env.WALLET_ADDRESS, ethers.utils.parseUnits( bonus.toString(), 18),]
                    ),
                    toAddress:tokenModule.address,
                }
            ]);
        console.log('Successfully created proposal to give bonus to '+process.env.WALLET_ADDRESS +' as year end bonus');      

    }catch(error){
        console.error('Failed to create proposal to give bonus to '+process.env.WALLET_ADDRESS +' as year end bonus', error);
        process.exit(1);
    }
})();

