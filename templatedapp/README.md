# Basic Sample Hardhat Project

1. npx hardhat
This command to create a basic hardhat project and install basic modules

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```

Addtionally, run>>npm install @nomiclabs/hardhat-etherscan
This is the contract verify plugin


2. npx hardhat run scripts/run.js
This command to run contract test scripts locally


3. npx hardhat run scripts/deploy.js --network ropsten
This command to deploy the contract to blockchain per hardhat.config.js

4. npx hardhat verify 0xc9E7f50B87a3Ec7cf59960612F985dE336eAf6F4 --network ropsten
This command to verify the deployed contract