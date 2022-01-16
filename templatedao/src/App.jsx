import {useEffect, useMemo, useState} from 'react';
import {useWeb3} from '@3rdweb/hooks'
import {ThirdwebSDK, VoteModule} from '@3rdweb/sdk';
import { ethers } from 'ethers';
import connectToWallet from './utils/connect-wallet.js';
import checkClaimedMembership from './utils/check-claimedMembership.js';
import mintMembershipNFT from './utils/claim-membership.js';
import {properties} from './properties.js';

const sdk = new ThirdwebSDK(properties.NETWORK_PROVIDER);
const drop = sdk.getBundleDropModule( properties.THIRDWEB_DROP_ID);

const App = () => {
  const { connectWallet, address, error, provider } = useWeb3();  
  const signer = provider ? provider.getSigner() : undefined;

  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);    
  
  useEffect(() => {    
    sdk.setProviderOrSigner(signer);
  }, [signer]);


  useEffect(() => {
    checkClaimedMembership(address, drop, setHasClaimedNFT);    
  }, [address]);
  
  if (!address) {    
    return connectToWallet(connectWallet);
  }
  
  if (!hasClaimedNFT){    
    return mintMembershipNFT(address,drop, setHasClaimedNFT);
  }
  
  if (hasClaimedNFT) {
    return (
      <div className="member-page">
        <h1>TemplateDAO Member Page</h1>
        <p>Congratulations on being a member</p>
      </div>
    );
  };

  return (
      <div className="mint-nft">
        <h1>wallet connected, now what!</h1>       
      </div>
    );
  };

export default App;
