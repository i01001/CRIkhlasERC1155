//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TriangleofLife is ERC1155, Ownable {
    
  string public name;
  string public symbol;
  string public baseURI;

  mapping(uint => string) public tokenURI;

  constructor() ERC1155("") {
    name = "TriangleofLife";
    symbol = "IKHTRI55";
    baseURI = "ipfs://QmcKk68jowBm52fVKmN8HxQRfDGhD8LsZXrGwF5gmzKK19/1.json";
  }

  function mint(address _to, uint _id, uint _amount) external onlyOwner {
    _mint(_to, _id, _amount, "");
    tokenURI[_id] = baseURI;
    emit URI(baseURI, _id);
  }

  function mintBatch(address _to, uint[] memory _ids, uint[] memory _amounts) external onlyOwner {
    _mintBatch(_to, _ids, _amounts, "");
  }

  function burn(uint _id, uint _amount) external {
    _burn(msg.sender, _id, _amount);
  }

  function burnBatch(uint[] memory _ids, uint[] memory _amounts) external {
    _burnBatch(msg.sender, _ids, _amounts);
  }

  function burnForMint(address _from, uint[] memory _burnIds, uint[] memory _burnAmounts, uint[] memory _mintIds, uint[] memory _mintAmounts) external onlyOwner {
    _burnBatch(_from, _burnIds, _burnAmounts);
    _mintBatch(_from, _mintIds, _mintAmounts, "");
  }

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
    baseURI = _newBaseURI;
  }

  function uri(uint _id) public override view returns (string memory) {
    return tokenURI[_id];
  }

}
    