import sdk from './1-initialize-sdk.js';
import dotenv from 'dotenv';

dotenv.config();

const app = sdk.getAppModule(process.env.THIRDWEB_APP_ID);

(async()=>{
    try{
        const tokenModule = await app.deployTokenModule({
            name: process.env.THIRDWEB_DROP_GOVERNANCE_TOKEN_NAME,
            symbol:process.env.THIRDWEB_DROP_GOVERNANCE_TOKEN_SYMBOL,
        });
        console.log('successfully deployed token module at ', tokenModule.address);
    }catch(error){
        console.log('failed to deploy token module',error);
    }

})();