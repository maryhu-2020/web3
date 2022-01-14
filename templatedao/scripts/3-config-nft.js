import sdk from './1-initialize-sdk.js';
import {readFileSync} from 'fs';

const bundleDrop = sdk.getBundleDropModule('0x7615B5989Ff340324D894497D277C67aF4D75437');

( async()=>{
    try{
        await bundleDrop.createBatch([{
            name:'Nikki',
            description:'the cutest',
            image: readFileSync('scripts/assets/IMG_5922.JPG'),
        }]);
        console.log('🔥 created a new NFT in the drop');
    }catch(error){
        console.log('🤬 failed to drop the new NFT', error);
    }
})()