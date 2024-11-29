require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

module.exports = {
  solidity: "0.8.28",
  networks: {
    fuji: {
        url: "https://api.avax-test.network/ext/bc/C/rpc",
        gasPrice: 225000000000,
        chainId: 43113,
        accounts: [process.env.WALLET_PRIVATE_KEY],
      },
  }
};
