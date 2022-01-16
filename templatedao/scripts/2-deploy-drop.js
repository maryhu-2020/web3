import ethers from 'ethers';
import sdk from './1-initialize-sdk.js';
import {readFileSync} from 'fs';
import dotenv from 'dotenv'

dotenv.config();

const app = sdk.getAppModule(process.env.THIRDWEB_APP_ID);

( async() => {
    try{
        const bundleDropModule = await app.deployBundleDropModule({
            name: process.env.THIRDWEB_DROP_NAME,
            description: process.env.THIRDWEB_DROP_DESCRIPTION,
            image: readFileSync(process.env.THIRDWEB_DROP_IMAGE),
            // We need to pass in the address of the person who will be receiving the proceeds from sales of nfts in the module.
            // We're planning on not charging people for the drop, so we'll pass in the 0x0 address
            // you can set this to your own wallet address if you want to charge for the drop.
            //primarySaleRecipientAddress:ethers.constants.AddressZero,        
            primarySaleRecipientAddress:process.env.THIRDWEB_DROP_PRIMARYSALE_RECIPIENT_ADDRESS
        });
        console.log('deployed bundleDrop module at ', bundleDropModule.address);
        console.log('bundleDrop metadata: ', await bundleDropModule.getMetadata());
    }catch(error){
        console.log('failed to deploy bundleDrop module',error);
    }
})()