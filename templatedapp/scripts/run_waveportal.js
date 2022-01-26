const { assert } = require("chai");


const main = async () => {    
    const [owner, randomPerson ] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy({
        value:hre.ethers.utils.parseEther('0.1'),
    });
    await waveContract.deployed();
    
    let balance = await hre.ethers.provider.getBalance(waveContract.address);    
    
    console.log("Contract WavePortal deployed to: ", waveContract.address);
    console.log("Contract WavePortal deployed by: ", owner.address);
    console.log("Contract WavePortal init balance is: ", hre.ethers.utils.formatEther(balance));

    let waveCount = await waveContract.getTotalWaves();
    let waveTxn = await waveContract.wave('Hi, this is Nikki waving');
    await waveTxn.wait();    
    balance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log("After wave 1,  Contract WavePortal balance is: ", hre.ethers.utils.formatEther(balance));

    waveTxn = await waveContract.connect(randomPerson).wave('Hi, this is random person waving');
    await waveTxn.wait();
    balance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log('After wave 2, current balance:', hre.ethers.utils.formatEther(balance));

    waveTxn = await waveContract.connect(randomPerson).wave('Hi, this is random person waving again')
    await waveTxn;
    let balance_2 = await hre.ethers.provider.getBalance(waveContract.address);
    assert(  balance === balance_2, 'balance should not change because you waved too soon that the txn was cancelled')
    
    waveCount = await waveContract.getTotalWaves();
    waves = await waveContract.getWaves();
    console.log(waves);

};


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