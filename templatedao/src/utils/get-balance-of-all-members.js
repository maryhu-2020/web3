
const getBalancesOfAllMembers = (hasClaimedNFT, drop) => {  
    if ( !hasClaimedNFT){
        return;
    }

    console.log('getBalancesOfAllMembers 0000', drop.address);    
    /*
    drop.getAllClaimerAddresses('0').then((addresess) => {
      console.log("🚀 Members addresses" );
      //setMemberAddresses(addresess);
    })
    .catch((err) => {
      console.error("failed to get member list", err);
    });
    */
    const address = '0xe9C801270Aa661583829486Fd99C325aE0311E9F';
    drop
      .balanceOf(address, '0')
      .then( (balance) => {
          console.info('test 1:', balance.gt(0));
      })
      .catch( (error) => {        
        console.error('test 2:',error);
      });
    
    drop
      .getAllClaimerAddresses('0')
      .then( (d) => {
        console.info('test 3:', d);
      } )
      .catch( (error) => {        
        console.error('test 4:',error);
      });
      

    /*
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