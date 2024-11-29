const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const Token = await ethers.getContractFactory("DegenToken");
  const token = await Token.deploy();
  console.log("DegenToken deployed to:", token.address);

  await token.mint(deployer.address, ethers.utils.parseUnits("10000", 18));
  console.log("Minted 10,000 DGN tokens to deployer address");
}

console.log("Private Key:", process.env.PRIVATE_KEY);


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
