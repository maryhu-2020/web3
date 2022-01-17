import sdk from './1-initialize-sdk.js';
import {ethers} from 'ethers';
import dotenv from 'dotenv'

dotenv.config();
const app = sdk.getAppModule(process.env.THIRDWEB_APP_ID);

( async() => {
    try{
        const votingModule =  await app.deployVoteModule({            
            name: process.env.THIRDWEB_VOTING_PROPOSAL_NAME,
            votingTokenAddress: process.env.THIRDWEB_DROP_GOVERNANCE_TOKEN_ID,
            proposalStartWaitTimeInSeconds: 0,
            proposalVotingTimeInSeconds: 24 * 60 * 60 * parseInt(process.env.THIRDWEB_VOTING_DAYS.toString(), 10),
            votingQuorumFraction: ethers.utils.parseUnits(process.env.THIRDWEB_VOTING_QUORUM_FRACTION.toString(),18),
            minimumNumberOfTokensNeededToPropose: process.env.THIRDWEB_VOTING_MINIMAL_REQUIRED_NUMBER_OF_TOKENS,
        });
        console.log('successfully deployed voting module, address: ', votingModule.address);
    }catch(error){
        console.error('failed to create Voting module', error);
    }

} )();