const {assert} = require("chai");
const {ethers} = require("hardhat");



const testBid = async(auctionC, bidder1, bidder2,bidder3) => {
    await auctionC.connect(bidder1).bid({value: ethers.utils.parseUnits("1.2")});
    let _highestBidder = await auctionC.highestBidder();
    assert( _highestBidder == bidder1.address, 'bidder1 is the highest bidder');
    let _hightestBid = await auctionC.highestBid();
    assert(_hightestBid.eq(ethers.utils.parseUnits('1.2')), 'hightest bid is 1.2 eth');
    
    
    await auctionC.connect(bidder2).bid( {value:ethers.utils.parseUnits('2')});
    _highestBidder = await auctionC.highestBidder();
    assert( _highestBidder == bidder2.address, 'bidder2 is the highest bidder');
    _hightestBid = await auctionC.highestBid();
    assert(_hightestBid.eq(ethers.utils.parseUnits('2')), 'hightest bid is 2 eth');
    
    try{
        await auctionC.connect(bidder3).bid( {value:ethers.utils.parseUnits('1.8')});
    }catch(error){
        console.error('VM exception');
        console.log( error);
    }

    _highestBidder = await auctionC.highestBidder();
    assert( _highestBidder == bidder2.address, 'bidder2 is the highest bidder');
    _hightestBid = await auctionC.highestBid();
    assert(_hightestBid.eq(ethers.utils.parseUnits('2')), 'hightest bid is 2 eth');    
}

const testWithdraw = async(auctionC,bidder1, bidder2) => {
    await auctionC.connect(bidder1).bid({value: ethers.utils.parseUnits("1.2")});
    await auctionC.connect(bidder2).bid( {value:ethers.utils.parseUnits('2')});
    
    let _balance_before = await auctionC.provider.getBalance(bidder1.address);
    let withdraw = await auctionC.connect(bidder1).withdraw();
    assert( withdraw, 'should withdraw successfully');
    let _balance = await auctionC.provider.getBalance(bidder1.address);
    let _added = _balance.sub(_balance_before);
    console.log('_balance='+ _balance+ ", added="+ ethers.utils.formatUnits(_added));
    //assert( ethers.utils.parseUnits("1.2").eq( _added), 'bidder has 1.2 eth withdrawn' );

    let _bidder1_bid = await auctionC.pendingReturns(bidder1.address);
    assert( _bidder1_bid.eq(ethers.utils.parseUnits("0")), 'bidder1 has no pending anymore');
}

function hi(){
    console.log('hi');
}
const testEndAuction = async(auctionC, bidder1, beneficiary) => {
    let _beneficiary_balance_0 = await auctionC.provider.getBalance( beneficiary.address);
    console.log('_beneficiary_balance_0='+_beneficiary_balance_0);

    await auctionC.connect(bidder1).bid({value: ethers.utils.parseUnits("1.2")});

    //setTimeout( async() => {await auctionC.endAuction()}, 2000);
    setTimeout( hi, 2000);
    //let _beneficiary_balance = await auctionC.provider.getBalance( beneficiary.address);
    //console.log('_beneficiary_balance='+_beneficiary_balance);
    //assert( _beneficiary_balance.eq( ethers.utils.parseUnits("1.2") ), 'beneficiary received the hightest bid');

    //let _end = await auctionC.ended();
    //assert( _end, 'auction is ended');

    //await auctionC.endAuction();
}

const main = async() => {
    const[singer, bidder1, bidder2, bidder3,benificiary] = await ethers.getSigners();

    const exauction_cFactory = await ethers.getContractFactory('ExAuction');
    const exAuctionC = await exauction_cFactory.deploy(1000, benificiary.address);
    await exAuctionC.deployed();
    console.log( 'contract ExAuction is deployed at: '+ exAuctionC.address );

    let _beneficiary = await exAuctionC.beneficiary();
    assert( _beneficiary == benificiary.address, 'beneficiary address is not set correctly');
    let _auctionEndTime = await exAuctionC.auctionEndTime();
    console.log(' auction will end at '+ _auctionEndTime);


    await testBid( exAuctionC,bidder1, bidder2, bidder3);
    //await testWithdraw(exAuctionC,bidder1, bidder2);
    //await testEndAuction(exAuctionC,bidder1, benificiary);
}

const runMain = async() =>{
    try{
        await main();
        process.exit(0);
    }catch( error){
        console.log(error);
        process.exit(1);
    }

}

runMain();