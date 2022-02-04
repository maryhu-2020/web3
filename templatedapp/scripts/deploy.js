const ethers = require('ethers');
const dotenv = require('dotenv');

dotenv.config();

const deployExBallot = async() => {
    const mycontract = await hre.ethers.getContractFactory("ExBallot");   
    const proposalNames = [];
    proposalNames.push(ethers.utils.id('Proposal 1: Pass the infrature bill'));
    proposalNames.push(ethers.utils.id('Proposal 2 - Print 2T USD in 2022'));
    proposalNames.push(ethers.utils.id('Proposal 3 - Send xxxx to Mars on 4th of July, 2022'));  
    
    const deployed_contract = await mycontract.deploy(proposalNames,{value:hre.ethers.utils.parseEther('0.0001'),});
    return deployed_contract;
}

const deployExAuction = async() => {
    const contractF = await hre.ethers.getContractFactory('ExAuction');

    const beneficiary = ethers.utils.getAddress(process.env.ACCOUNT_ACCOUNT2_ROPSTEN);
    const _contract = await contractF.deploy(1000, beneficiary);
    return _contract;
}

const main = async () => {
    const [deployer] = await hre.ethers.getSigners();
    const accountBalance = await deployer.getBalance();
    console.log("deplying contract by: ", deployer.address);
    console.log("Account balance: ", accountBalance);
    
    //const deployed_contract = await deployExBallot();
    const deployed_contract = await deployExAuction();
    
    await deployed_contract.deployed();    
    console.log("the contract is deplayed at: ", deployed_contract.address);
}


const runMain = async () => {
    try{
        await main();
        process.exit(0);
    }catch (error){
        console.log(error);
        process.exit(1);
    }
}


runMain();