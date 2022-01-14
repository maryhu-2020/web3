import ethers from 'ethers';
import sdk from './1-initialize-sdk.js';
import {readFileSync} from 'fs';

const app = sdk.getAppModule('0x36948dc9ad22AB547a10572AEAd919A24997B82A');

( async() => {
    try{
        const bundleDropModule = await app.deployBundleDropModule({
            name: 'Save Cats DAO membership',
            description: 'a group of people who love cats',
            image: readFileSync('./scripts/assets/IMG_5922.JPG'),
            // We need to pass in the address of the person who will be receiving the proceeds from sales of nfts in the module.
            // We're planning on not charging people for the drop, so we'll pass in the 0x0 address
            // you can set this to your own wallet address if you want to charge for the drop.
            primarySaleRecipientAddress:ethers.constants.AddressZero,        
        });
        console.log('✅ deployed bundleDrop module at ', bundleDropModule.address);
        console.log('✅ bundleDrop metadata: ', await bundleDropModule.getMetadata());
    }catch(error){
        console.log('failed to deploy bundleDrop module',error);
    }
})()