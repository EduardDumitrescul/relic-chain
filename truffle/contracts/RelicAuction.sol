// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

contract RelicAuction {
    uint256[] private auctionedTokenIds;

    constructor(){

    }

    function auctionToken(uint256 tokenId)
    public{
        auctionedTokenIds.push(tokenId);
    }

    function getAuctionedTokenIds()
    public
    view
    returns (uint256[] memory) {
        return auctionedTokenIds;
    }
}
