// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract RelicToken is ERC721{
    uint256 public tokenCount = 0;

    event TokenCreated(uint256 value);

    mapping(address => uint256[]) private tokens;
    mapping(uint256 => string) private names;
    mapping(uint256 => string) private descriptions;

    constructor()
    ERC721("RelicToken", "RTK") {

    }

    function createToken(address owner, string memory name, string memory description) public  {
        tokenCount++;
        uint256 newTokenId = tokenCount;
        _safeMint(owner, newTokenId);
        tokens[owner].push(newTokenId);
        names[newTokenId] = name;
        descriptions[newTokenId] = description;
        emit TokenCreated(newTokenId);
    }

    function name(uint256 tokenId)
    public
    view
    returns (string memory){
        return names[tokenId];
    }

    function description(uint256 tokenId)
    public
    view
    returns (string memory){
        return descriptions[tokenId];
    }

    function getTokenIds()
    public
    view
    returns (uint256[] memory) {
        return tokens[msg.sender];
    }
}
