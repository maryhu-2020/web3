import {useEffect, useMemo, useState} from 'react';
import {useWeb3} from '@3rdweb/hooks'
import {ThirdwebSDK, VoteModule} from '@3rdweb/sdk';
import connectToWallet from './utils/connect-wallet.js';
import checkClaimedMembership from './utils/check-claimedMembership.js';
import mintMembershipNFT from './utils/claim-membership.js';
import populateMemberList from './utils/populate-memberlist.js';
import getBalancesOfAllMembers from './utils/get-balance-of-all-members.js';
import showMembershipDashboard from './utils/show-membership-dashboard.js';
import {properties} from './properties.js';

const sdk = new ThirdwebSDK(properties.NETWORK_PROVIDER);
const drop = sdk.getBundleDropModule( properties.THIRDWEB_DROP_ID);
const token = sdk.getTokenModule(properties.THIRDWEB_DROP_GOVERNANCE_TOKEN_ID);

const App = () => {
  const { connectWallet, address, error, provider } = useWeb3();  
  const signer = provider ? provider.getSigner() : undefined;

  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);    
  const [memberTokenAmounts, setMemberTokenAmounts] = useState({});
  const [memberAddresses, setMemberAddresses] = useState([]);
  
  useEffect(() => {    
    sdk.setProviderOrSigner(signer);
  }, [signer]);

  useEffect(() => {
    checkClaimedMembership(address, drop, setHasClaimedNFT);    
  }, [address]);

  
  useEffect( () => {
    //getBalancesOfAllMembers( hasClaimedNFT, drop, token, setMemberAddresses, setMemberTokenAmounts );    
    getBalancesOfAllMembers(hasClaimedNFT,drop);
  
  }, [hasClaimedNFT]);
  

  const memberList = useMemo(() => {
    return populateMemberList(memberAddresses, memberTokenAmounts );
  }, [memberAddresses, memberTokenAmounts]);

  if (!address) {    
    return connectToWallet(connectWallet);
  }
  
  if (!hasClaimedNFT){    
    return mintMembershipNFT(address,drop, setHasClaimedNFT);
  }
  
  if (hasClaimedNFT) {    
    return showMembershipDashboard( memberList);
  };

  return (
      <div className="mint-nft">
        <h1>wallet connected, now what?</h1>       
      </div>
    );
  };

export default App;
