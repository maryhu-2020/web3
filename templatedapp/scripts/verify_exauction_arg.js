const ethers = require('ethers');
const dotenv = require('dotenv');

dotenv.config();
module.exports = [
    24*60*60,
    ethers.utils.getAddress(process.env.ACCOUNT_ACCOUNT2_ROPSTEN)
]