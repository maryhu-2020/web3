import { ethers } from "ethers";
import sdk from './1-initialize-sdk.js';

const tokenModule = sdk.getTokenModule(process.env.THIRDWEB_DROP_GOVERNANCE_TOKEN_ID);
const votingModule = sdk.getVoteModule(process.env.THIRDWEB_VOTING_CONTRACT_ID);

( async () => {
    try{
        await tokenModule.delegateTo(process.env.WALLET_ADDRESS_MUMBAI)  //becauase of minimumNumberOfTokensNeededToPropose
        const bonus = 888;        
        const proposalDescription = 'Should the DAO give '+bonus+' tokens to the Treasure Assistant: '+ process.env.THIRDWEB_VOTING_SEND_BONUS_TO +' at year end?';
        const executions=[
            {
                toAddress: tokenModule.address,
                nativeTokenValue: 0,
                transactionData: tokenModule.contract.interface.encodeFunctionData(
                    "transfer", [ 
                        process.env.THIRDWEB_VOTING_SEND_BONUS_TO, 
                        ethers.utils.parseUnits( bonus.toString(), 18),
                    ]
                ),               
            }
        ]
        const proposalId = await votingModule.propose( proposalDescription, executions);
        console.log('Successfully created proposal: '+ proposalId);  
    }catch(error){
        console.error('Failed to create proposal to give bonus to '+process.env.THIRDWEB_VOTING_SEND_BONUS_TO +' as year end bonus', error);
        process.exit(1);
    }
})();

