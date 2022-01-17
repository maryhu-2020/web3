import sdk from './1-initialize-sdk.js';
import dotenv from 'dotenv';

dotenv.config();
const votingModule = sdk.getVoteModule(process.env.THIRDWEB_VOTING_CONTRACT_ID);

( async() =>{
    try{
        await votingModule.execute(process.env.THIRDWEB_VOTING_PROPOSAL_ID);
        console.log('Successfully executed proposal: ' + process.env.THIRDWEB_VOTING_PROPOSAL_ID);
    }catch(error){
        console.error('Failed to execute proposal', error);
        process.exit(1); 
    }
} )();