import { task } from "hardhat/config";
// import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
// import "@typechain/hardhat";
// import "hardhat-gas-reporter";
// import "solidity-coverage";
import "@nomiclabs/hardhat-web3";


task("mint", "Mint NFTs on TriangleofLife")
.addParam("address", "Address to mint the NFT to")
.addParam("id", "Token ID of minted NFT")
.addParam("amount", "Number of NFTs to be minted")
.setAction(async (taskArgs,hre) => {
  const [sender, secondaccount, thirdaccount, fourthaccount] = await hre.ethers.getSigners();
  const TriangleofLife = await hre.ethers.getContractFactory("TriangleofLife");
  const triangleofLife = await TriangleofLife.deploy();
  await triangleofLife.deployed();

  let output = await triangleofLife.connect(sender).mint(taskArgs.address, taskArgs.id, taskArgs.amount);

console.log(await output);
});