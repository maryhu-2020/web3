const {assert} = require("chai");
const { ethers } = require("hardhat");



const testGiveRightToVote = async(exballotContract,cp, randomPerson) => {
    await exballotContract.giveRightToVote( randomPerson );
    const voters_randomp = await exballotContract.voters(randomPerson);
    assert( voters_randomp.weight == 1, 'randomp has right to vote' );
}

const testVote = async(exballotContract,randomPerson) => {
    await exballotContract.connect(randomPerson).vote(0);

    let voter_randomP = await exballotContract.voters( randomPerson.address);
    assert(voter_randomP.voted, 'randomP voted' );
    assert(voter_randomP.vote == 0, 'randomP voted #0' );
    let proposal0 = await exballotContract.proposals(0);
    assert( proposal0.voteCount == 1, 'proposal has 1 vote');

    let winningPNo = await exballotContract.winningProposal();
    assert( winningPNo == 0, '#0 won');

    let winnerName = await exballotContract.winnerName();
    let winningP = await exballotContract.proposals( winningPNo);
    assert( winnerName == winningP.name, 'winnner is '+winnerName)

    //await exballotContract.connect(randomPerson).vote(0);

}

const main = async() => {
    const [owner, randomPerson] = await hre.ethers.getSigners();

    const contractFactory = await hre.ethers.getContractFactory("ExBallot");
    const proposalNames = [];

    const p1hex = ethers.utils.id('Proposal 1: Pass the infrature bill')    
    proposalNames.push(p1hex);
    proposalNames.push(ethers.utils.id('Proposal 2 - Print 2T USD in 2022'));
    proposalNames.push(ethers.utils.id('Proposal 3 - Send xxxx to Mars on 4th of July, 2022'));    
    const exballotContract = await contractFactory.deploy( proposalNames);
    await exballotContract.deployed();
    console.log( 'depoyed contract at: '+ exballotContract.address );
        
    let cp = await exballotContract.chairperson();    
    assert(owner.address == cp, 'the onwer is the chairperson');

    let recordedProposal0 = await exballotContract.proposals(0);    
    assert(p1hex == recordedProposal0.name && 0 == recordedProposal0.voteCount, 'added proposal 1');
    
    let voters_chair = await exballotContract.voters(cp);
    assert( voters_chair.weight == 1, 'default weight for chairperson is 1' );

    await testGiveRightToVote(exballotContract,cp, randomPerson.address);
    await testVote(exballotContract,randomPerson);

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



