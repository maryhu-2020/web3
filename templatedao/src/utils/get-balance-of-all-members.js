const getBalancesOfAllMembers = (hasClaimedNFT, drop, setMemberAddresses) => {
  /*
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
    console.log('getAllClaimerAddresses ');

    
    token.getAllHolderBalances().then((amounts) => {
        console.log("Amounts", amounts)
        setMemberTokenAmounts(amounts);
      })
     .catch((err) => {
      console.error("failed to get token amounts", err);
     });
    */ 
}

export default getBalancesOfAllMembers;