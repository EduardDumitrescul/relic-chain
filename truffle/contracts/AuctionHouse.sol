// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

contract AuctionHouse {
    uint256[] private auctionedTokenIds;

    constructor(){

    }

    function createAuction(uint256 tokenId)
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
