const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DegenToken", function () {
  let Token, token, owner, addr1, addr2;

  beforeEach(async function () {
    Token = await ethers.getContractFactory("DegenToken");
    [owner, addr1, addr2] = await ethers.getSigners();

    token = await Token.deploy();
    await token.deployed();
  });

  it("Should deploy with the correct name and symbol", async function () {
    expect(await token.name()).to.equal("Degen");
    expect(await token.symbol()).to.equal("DGN");
  });

  it("Should mint tokens only by the owner", async function () {
    await token.mint(addr1.address, 1000);
    expect(await token.balanceOf(addr1.address)).to.equal(1000);

    await expect(token.mint(addr1.address, 1000)).to.be.revertedWith("Ownable: caller is not the owner");
  });

  it("Should allow anyone to burn their own tokens", async function () {
    await token.mint(addr1.address, 1000);
    await token.connect(addr1).burn(500);
    expect(await token.balanceOf(addr1.address)).to.equal(500);
  });

  it("Should allow transferring tokens", async function () {
    await token.mint(addr1.address, 1000);
    await token.connect(addr1).transfer(addr2.address, 500);
    expect(await token.balanceOf(addr1.address)).to.equal(500);
    expect(await token.balanceOf(addr2.address)).to.equal(500);
  });
});
