
const main = async () => {
    const [deployer] = await hre.ethers.getSigners();
    const accountBalance = await deployer.getBalance();
    console.log("deplying contract by: ", deployer.address);
    console.log("Account balance: ", accountBalance);

    const mycontract = await hre.ethers.getContractFactory("WavePortal");    
    const deployed_contract = await mycontract.deploy({
        value:hre.ethers.utils.parseEther('0.0001'),
    });
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