// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

contract ExAuction {

    address payable public beneficiary;
    uint256 public auctionEndTime;

    address public highestBidder;
    uint256 public highestBid;

    mapping( address => uint256) pendingReturns;

    bool ended;

    event HighestBidIncreased(address bidder, uint256 amount );
    event AuctionEnded(address winner, uint256 amount );

    error AuctionAlreadyEnded();
    error BidNotHightEnough(uint256 highestBid);
    error AuctionNotYetEnded();
    error AuctionEndAlreadyCalled();

    constructor( uint256 biddingTime, address payable benefifiaryAdress ) {
        beneficiary = benefifiaryAdress;
        auctionEndTime = block.timestamp + biddingTime;
    }

    function bid() external payable {
        if( block.timestamp > auctionEndTime)
            revert AuctionAlreadyEnded();

        if ( msg.value < highestBid)
            revert BidNotHightEnough( highestBid);

        if( highestBid != 0){
            pendingReturns[ highestBidder ] = highestBid;
        }

        highestBidder = msg.sender;
        highestBid = msg.value;
        emit HighestBidIncreased( highestBidder, highestBid);
    }

    function withdraw() external returns (bool){
        uint256 amount = pendingReturns[msg.sender];
        if( amount > 0){
           pendingReturns[msg.sender] = 0;
           if( !payable( msg.sender).send( amount) ) {
               pendingReturns[msg.sender] = amount;
               return false;
           }
        }
        return true;
    }

    function endAuction() external {
        if( block.timestamp < auctionEndTime)
            revert AuctionNotYetEnded();

        if( ended)
            revert AuctionEndAlreadyCalled();
        
        ended = true;

        beneficiary.transfer( highestBid);
    }




}