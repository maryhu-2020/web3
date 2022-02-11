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
```
npx hardhat verify --constructor-args scripts/verify_exballot_arg.js 0x8da5f2766F315F5910F5Ffe7DB646dd88FB5d7a4 --network ropsten
```

# Ether Basics

1. Transaction fee: 

Transaction fee = n of gas * ( base fee + tip) = xxxxxxxxx gwei 

# Solidity

1. Value Types: passed by value

   - Boolean:   
    ```
    bool
    ```

   - Integers:  uint8 ~ uint258, int8 ~ int256 in steps of 8
   
   - Address:   adress, address payable
     - Members of Addresses
       - balance, transfer, send
       - call, delegatecall, staticcall
       - code, codehash
   
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

2. Function:

    - type: external (public) /internal
    - visibility: pure/view/payable
    - internal call is JUMP call
    - external call is 
    - external function:
      - address 
      - selector: The first four bytes of the call data

3. Reference Types

    - struct, array, mapping

    - data location: 
      - memory 
        - lifetime is limited to an external function call
      
      - storage
          state variables are stored;the lifetime is limited to the lifetime of a contract
          
          Lead Solidity dev chriseth: “You can think of storage as a large array that has a virtual structure… a structure you cannot change at runtime - it is determined by the state variables in your contract”

          If you declare variables in functions without the memory keyword, then solidity will try to use the storage structure, which currently compiles, but can produce unexpected results. memory tells solidity to create a chunk of space for the variable at method runtime, guaranteeing its size and structure for future use in that method.

          memory cannot be used at the contract level. Only in methods.

      - calldata  
        - a non-modifiable, non-persistent area where function arguments are stored, and behaves mostly like memory;
        - try to use calldata as data location because it will avoid copies and also makes sure that the data cannot be modified.

      https://stackoverflow.com/questions/33839154/in-ethereum-solidity-what-is-the-purpose-of-the-memory-keyword  

      - Data location and assignment behaviour

        An assignment or type conversion that changes the data location will always incur an automatic copy operation, while assignments inside the same data location only copy in some cases for storage types.
        - storage <=> memory(calldata)  : copy
        - memory  <=> memory            : reference
        - storage => local storage      : reference
        - * => storage                  : copy   

    - mapping
      - a hash tables, which are virtually initialised such that every possible key exists and is mapped to a default value 
      - the key data is not stored in a mapping, only its keccak256 hash is used to look up the value
      - So:
        - mappings do not have a length
        - mappings do not have concept of key or vaule being set
        - cannot be used as parameters or return parameters of contract functions that are publicly visible
    
    - Arrays
      - bytes and string 
        - is packed tightly in calldata and memory
        - use bytes for arbitrary-length raw byte data and string for arbitrary-length string (UTF-8) data
        - If you can limit the length to a certain number of bytes, always use one of the value types bytes1 to bytes32 because they are much cheaper
        - bytes.concat
        - memory arrays with dynamic length can be created using the new operator
          
          ```
          // SPDX-License-Identifier: GPL-3.0
          pragma solidity >=0.4.16 <0.9.0;

          contract C {
              function f(uint len) public pure {
                  uint[] memory a = new uint[](7);
                  bytes memory b = new bytes(len);
                  assert(a.length == 7);
                  assert(b.length == len);
                  a[6] = 8;
              }
          }
          ```

    - struct

      ```
      struct Campaign {
        address payable beneficiary;
        uint fundingGoal;
        uint numFunders;
        uint amount;
        mapping (uint => Funder) funders;
      }

      uint numCampaigns;
      mapping (uint => Campaign) campaigns;

      function newCampaign(address payable beneficiary, uint goal) public returns (uint campaignID) {
          campaignID = numCampaigns++; // campaignID is return variable
          // We cannot use "campaigns[campaignID] = Campaign(beneficiary, goal, 0, 0)"
          // because the right hand side creates a memory-struct "Campaign" that contains a mapping.
          Campaign storage c = campaigns[campaignID];
          c.beneficiary = beneficiary;
          c.fundingGoal = goal;
      }
      ```

4. Inheritance:
   - virtual, override 
   - abstract, interface
   - super.f(..) will use JUMP and not a message call
   - The mutability may be changed to a more strict one
      - external -> public; nonpayable -> view or pure; view -> pure; payable can't be changed
   - in multiple inheritance, the given bases are searched from right to left in a depth-first manner, stopping at the first match   

5. Liberaries

  OpenZeppelin is the golden stanadard smart contract library
  npm install @openzeppelin/contracts --save
  import "openzeppelin-solidity/contracts/access/Ownable.sol";

  - External call is DELEGATECALL
  - Internal call is JUMP call: types stored in memory will be passed by reference 
  - cannot:
    - have state variables
    - inherit nor be inherited
    - receive Ether
    - be destroyed
  - using L for T

6. Inline Assemby (Yul)
  low level assembly code




