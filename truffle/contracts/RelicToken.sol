// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract RelicToken is ERC721, ERC721URIStorage{
    uint256 public tokenCount = 0;

    event TokenCreated(uint256 value);

    constructor()
    ERC721("RelicToken", "RTK") {

    }

    function createToken(address owner, string memory uri) public  {
        tokenCount++;
        uint256 newTokenId = tokenCount;
        _safeMint(owner, newTokenId);
        _setTokenURI(newTokenId, uri);
        emit TokenCreated(newTokenId);
    }

    function tokenURI(uint256 tokenId)
    public
    view
    override(ERC721, ERC721URIStorage)
    returns (string memory){
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
    public
    view
    override(ERC721, ERC721URIStorage)
    returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
