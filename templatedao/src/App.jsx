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

  /*
  useEffect( () => {
    //getBalancesOfAllMembers( hasClaimedNFT, drop, token, setMemberAddresses, setMemberTokenAmounts );
    if ( !hasClaimedNFT){
      return;
    }
    console.log('getBalancesOfAllMembers ');
  
  drop.getAllClaimerAddresses("0").then((addresses) => {
    console.log("Members addresses", addresses)
    setMemberAddresses(addresses);      
  }).catch((err) => {
    console.error("failed to get member list", err);
  });
  }, [hasClaimedNFT]);
  */

  // This useEffect grabs all our the addresses of our members holding our NFT.
  useEffect(() => {
    if (!hasClaimedNFT) {
      console.log('getBalancesOfAllMembers 0');
      return;
    }

    console.log('getBalancesOfAllMembers 1');
    drop
      .getAllClaimerAddresses(0)
      .then((addresess) => {
        console.log("🚀 Members addresses", addresess);
        setMemberAddresses(addresess);
      })
      .catch((err) => {
        console.error("failed to get member list", err);
      });
  }, [hasClaimedNFT]);

  // This useEffect grabs the # of token each member holds.
  useEffect(() => {
    if (!hasClaimedNFT) {
      return;
    }

    // Grab all the balances.
    token
      .getAllHolderBalances()
      .then((amounts) => {
        console.log("👜 Amounts", amounts);
        setMemberTokenAmounts(amounts);
      })
      .catch((err) => {
        console.error("failed to get token amounts", err);
      });
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
