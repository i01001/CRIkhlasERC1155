import { expect } from 'chai';
import { BigNumber } from 'bignumber.js';
import { ethers, network} from 'hardhat';
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {TriangleofLife} from '../typechain'

async function getCurrentTime(){
    return (
      await ethers.provider.getBlock(await ethers.provider.getBlockNumber())
    ).timestamp;
  }

async function evm_increaseTime(seconds : number){
    await network.provider.send("evm_increaseTime", [seconds]);
    await network.provider.send("evm_mine");
  }

describe("Testing the ERC721 Contract", () =>{
    let nFT : TriangleofLife;

    let clean : any;
    let owner : SignerWithAddress, signertwo : SignerWithAddress, signerthree: SignerWithAddress;
    
    before(async () => {

        [owner, signertwo, signerthree] = await ethers.getSigners();

        const NFT = await ethers.getContractFactory("TriangleofLife");
        nFT = <TriangleofLife>(await NFT.deploy());
        await nFT.deployed();
        
    });

    describe("Checking constructor is run correctly", () => {
        it("Checks the BaseURI is correct or not in constructor", async () => {
            expect(await nFT.baseURI()).to.be.equal("ipfs://QmcKk68jowBm52fVKmN8HxQRfDGhD8LsZXrGwF5gmzKK19/1.json");
        })
    })

    describe("Checking if mint function is run correctly", () => {
      it("Checks the emit is correct", async () => {
          expect(await nFT.mint(owner.address, 1, 10)).to.emit(nFT, "URI").withArgs(nFT.baseURI, 1);
      })
    })

    describe("Checking if burn function is run correctly", () => {
      it("Checks that the NFT is burned", async () => {
        await nFT.connect(owner).burn(1, 2);
        expect(await nFT.balanceOf(owner.address, 1)).to.be.equal("8");
      })
    })

    describe("Checking if mintBatch function is run correctly", () => {
      it("Checks that the NFT is made in batch", async () => {
        await nFT.connect(owner).mintBatch(owner.address, [1,2,3], [5,10,4]);
        expect(await nFT.balanceOf(owner.address, 1)).to.be.equal("13");
        expect(await nFT.balanceOf(owner.address, 2)).to.be.equal("10");
        expect(await nFT.balanceOf(owner.address, 3)).to.be.equal("4");
      })
    })


    describe("Checking if burntBatch function is run correctly", () => {
      it("Checks that the NFT is burnt in batch", async () => {
        await nFT.connect(owner).burnBatch([1,2,3], [3,6,2]);
        expect(await nFT.balanceOf(owner.address, 1)).to.be.equal("10");
        expect(await nFT.balanceOf(owner.address, 2)).to.be.equal("4");
        expect(await nFT.balanceOf(owner.address, 3)).to.be.equal("2");
      })
    })

    describe("Checking if burnforMint function is run correctly", () => {
      it("Checks that the NFT is burnt and minted in batch", async () => {
        await nFT.connect(owner).burnForMint(owner.address, [1,2,3], [3,2,1], [4, 5],[3,3]);
        expect(await nFT.balanceOf(owner.address, 1)).to.be.equal("7");
        expect(await nFT.balanceOf(owner.address, 2)).to.be.equal("2");
        expect(await nFT.balanceOf(owner.address, 3)).to.be.equal("1");
        expect(await nFT.balanceOf(owner.address, 4)).to.be.equal("3");
        expect(await nFT.balanceOf(owner.address, 5)).to.be.equal("3");
      })
    })


      describe("Checking if uri function is run correctly", () => {
        it("Checks the return is correct", async () => {
            expect(await nFT.connect(owner).uri(1)).to.be.equal(await nFT.baseURI());
        })
      })
    
        describe("Checking the setBaseURI function is working as desired", () => {
          it("Checks if BaseURI has been updated", async () => {
            await nFT.connect(owner).setBaseURI(".test");
            await expect(".test").to.equal(await nFT.baseURI());
          })
  })
    
  })