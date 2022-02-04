# Basic Hardhat Project

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
This command to verify the deployed contract. 

Verify with arguments:
npx hardhat verify --constructor-args scripts/verify_exballot_arg.js 0x8da5f2766F315F5910F5Ffe7DB646dd88FB5d7a4 --network ropsten


# Ether Basics

1. Transaction fee: 

Transaction fee = n of gas * ( base fee + tip) = xxxxxxxxx gwei 

# Solidity

1. Value Types

   - Boolean:   
    ```
    bool
    ```

   - Integers:  uint8 ~ uint258, int8 ~ int256 in steps of 8
   
   - Address:   adress, address payable
     - Members of Addresses
   
   - Fixed-size byte arrays
    ```
    byte1, byte2,,,,byte32
    ```
   
   - Dynamically-sized byte array
    ```
    bytes, string
    ```
   
   - Address Literals
    ```
    0xdCad3a6d3569DF655070DEd06cb7A1b2Ccd1D3AF
    ```
   
   - Rational and Integer Literals
    ```
    18, 1.2, 2e10, 123_000, 0x2eff_abde
    ```

   - String Literals and Types
    ```
    bytes32 samevar = "stringliteral"
    ```

   - Enums

2. Function Types:

    - external (public) /internal
    - pure/view/payable

3. Reference Types

    - struct, array, mapping

    - data location: 
      - memory 
        - lifetime is limited to an external function call
      - storage
        - state variables are stored
        - the lifetime is limited to the lifetime of a contract
      - calldata  
        - contains the function arguments


    - mapping
    
    - Arrays
      -

