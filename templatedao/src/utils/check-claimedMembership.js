const checkClaimedMembership = (address, drop, setHasClaimedNFT) => {
    if (!address) {
        return;
      }
  
      drop
      .balanceOf(address, '0')
      .then( (balance) => {
        if( balance.gt(0)){
          setHasClaimedNFT(true);
        }else{
          setHasClaimedNFT(false);
          console.info('not clamied memebership NFT yet');
        }
      })
      .catch( (error) => {
        setHasClaimedNFT(false);
        console.error('failed to retrieve NFT balance',error);
      });
}

export default checkClaimedMembership;
