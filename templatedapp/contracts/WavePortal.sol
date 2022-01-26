// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract WavePortal{
    uint256 totalWaves;    
    uint256 private seed;

    struct Wave {
        address waver;
        string message;
        uint256 timestamp;
    }
    Wave[] waves;

    mapping (address => uint256) public lastWaveAt;
    
    event NewWave( address indexed from, string message, uint256 timestamp);

    constructor() payable {
        
        seed = (block.difficulty + block.timestamp) % 100;
        
        console.log("Yo yo, i am smartcontract WavePortal!");
    }

    function wave(string memory _message) public {
        require (
                lastWaveAt[msg.sender] + 30 seconds < block.timestamp,
                'try again in 30 seconds'
        );

        lastWaveAt[msg.sender] = block.timestamp;   

        totalWaves += 1;
        console.log("%s has waved!", msg.sender);
        
        waves.push( Wave(msg.sender, _message, block.timestamp) );

        seed = (seed + block.difficulty + block.timestamp) % 100;
        if ( seed < 50){
            console.log('you won the prize!', seed);

            uint256 prizeAmount = 0.0001 ether;
            require( 
                prizeAmount <= address(this).balance,
                "Not enough ether in the contract for prize"
            );
            (bool success,) = (msg.sender).call{value:prizeAmount}("");
            require(success,"failed to withdraw prize from contract");
        }else{
            console.log('ufortunately you did not win, try again next time!', seed);
        }

        emit NewWave( msg.sender, _message,block.timestamp);
    }

    function getTotalWaves( ) public view returns ( uint256 ){
        console.log("we have total %s waves", totalWaves);
        return totalWaves;
    }

    function getWaves() public view returns (Wave[] memory){        
        return waves;
    }
}