import { ethers } from 'ethers';

const populateMemberList = (memberAddresses, memberTokenAmounts) => {
    return memberAddresses.map((address) => {
        return {
          address,
          tokenAmount: ethers.utils.formatUnits(
            // If the address isn't in memberTokenAmounts, it means they don't
            // hold any of our token.
            memberTokenAmounts[address] || 0,
            18,
          ),
        };
      });
};

export default populateMemberList;