import sdk from './1-initialize-sdk.js';
import {readFileSync} from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const bundleDrop = sdk.getBundleDropModule(process.env.THIRDWEB_DROP_ID);

( async()=>{
    try{
        await bundleDrop.createBatch([{
            name:process.env.THIRDWEB_DROP_MEMBERSHIP_NFT_NAME,
            description:process.env.THIRDWEB_DROP_MEMBERSHIP_NFT_DESCRIPTION,
            image: readFileSync(process.env.THIRDWEB_DROP_MEMBERSHIP_NFT_IMAGE),
        }]);
        console.log('created a new NFT in the drop');
    }catch(error){
        console.log('failed to drop the new NFT', error);
    }
})()