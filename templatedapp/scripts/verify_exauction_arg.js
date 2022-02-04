const ethers = require('ethers');
const dotenv = require('dotenv');

dotenv.config();
module.exports = [
    1000,
    ethers.utils.getAddress(process.env.ACCOUNT_ACCOUNT2_ROPSTEN)
]