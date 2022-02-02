const {assert} = require("chai");
const {ethers} = require("hardhat");


const main = async() => {
    const[singer, addr2, benificiary] = await ethers.getSigners();

    const exauction_cFactory = await ethers.getContractFactory('ExAuction');
    const exAuctionC = await exauction_cFactory.deploy(1000, benificiary.address);
    await exAuctionC.deployed();
    console.log( 'contract ExAuction is deployed at: '+ exAuctionC.address );



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