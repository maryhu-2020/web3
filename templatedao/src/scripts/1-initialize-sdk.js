import {ThirdwebSDK} from '@3rdweb/sdk';
import ethers from 'ethers';
import dotenv from "dotenv";

//to securely store our environment variables
dotenv.config();

//to make sure our .env is working.
if( !process.env.PRIVATE_KEY || process.env.PRIVATE_KEY === ''){
    console.log('Private key not found 😹');
}
if( !process.env.ALCHEMY_API_URL || process.env.ALCHEMY_API_URL === ''){
    console.log('Alckemy API URL not found 😹');
}
if(!process.env.WALLET_ADDRESS || process.env.WALLET_ADDRESS === ''){ 
    console.log('wallet address not found 😹');
}
   
const sdk = new ThirdwebSDK(
    new ethers.Wallet(
        process.env.PRIVATE_KEY,
        ethers.getDefaultProvider(process.env.ALCHEMY_API_URL),
    ),
);

(async () =>{
    try{
        const apps = await sdk.getApps();
        console.log("your app's address is ", apps[0].address );
    }catch(error){
        console.error("Failed to get apps from the sdk", error);
        process.exit(1);
    }
})()

export default sdk;