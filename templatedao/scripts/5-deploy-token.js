import sdk from './1-initialize-sdk.js';

const app = sdk.getAppModule('0x36948dc9ad22AB547a10572AEAd919A24997B82A');

(async()=>{
    try{
        const tokenModule = await app.deployTokenModule({
            name: 'Save Cats DAO Governance Token',
            symbol: 'Nikki',
        });
        console.log('😺 successfully deployed token module at ', tokenModule.address);
    }catch(error){
        console.log('😡 failed to deploy token module',error);
    }

})();