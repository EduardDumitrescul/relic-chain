// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract RelicToken is ERC721{
    uint256 public tokenCount = 0;

    event TokenCreated(uint256 value);

    constructor()
    ERC721("RelicToken", "RTK") {

    }

    function createToken(address owner) public  {
        tokenCount++;
        uint256 newTokenId = tokenCount;
        _safeMint(owner, newTokenId);
        emit TokenCreated(newTokenId);
    }
}
