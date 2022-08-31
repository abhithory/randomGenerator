require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config({ path: __dirname + '/.env' })


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks:{
    mumbai:{
      url:process.env.URL,
      accounts:[process.env.PRIVATE_KEY]
    }
  },
  etherscan:{
      apiKey: {
        polygonMumbai:process.env.POLYGONSCAN_API_KEY
      }
  }
};
