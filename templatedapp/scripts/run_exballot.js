const {assert} = require("chai");

const main = async() => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const contractFactory = await hre.ethers.getContractFactory("ExBallot");
    const exballotContract = await contractFactory.deploy();
    await exballotContract.deployed();


}

const runMain = async () => {
    try{
        await main();
        process.exit(0);
    }catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();

