import sdk from './1-initialize-sdk.js';

const appModule = sdk.getAppModule('0x36948dc9ad22AB547a10572AEAd919A24997B82A');

( async() => {
    try{
        const votingModule =  await appModule.deployVoteModule({
            //governance contract name
            name: 'Save Cats DAO Proposal',

            //address of the governance token
            votingTokenAddress: '0x16Fc14070E9fdA5f8ea8e03dA3aa3b0297d1d67e',

            proposalStartWaitTimeInSeconds: 0,

            proposalVotingTimeInSeconds: 24 * 60 * 60,

            votingQuorumFraction: 0,

            minimumNumberOfTokensNeededToPropose: '10',
        });

        console.log(' successfully deployed voting module, address: ', votingModule.address);


    }catch(error){
        console.error('  failed to create Voting module', error);
    }

} )();