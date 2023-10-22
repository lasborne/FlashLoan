require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config()

const fantom_mainnet = process.env.FANTOM_API_KEY
const deployerPrivateKey = process.env.PRIVATE_KEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "fantom",
  networks: {
    hardhat: {},
    fantom: {
      url: fantom_mainnet,
      accounts: [deployerPrivateKey]
    }
  },
  /*etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  },*/
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
