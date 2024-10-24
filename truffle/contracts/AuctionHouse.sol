// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

interface TokenGeneratorContract {
    function ownerOf(uint256 tokenId) external view returns(address);
}

contract AuctionHouse {
    TokenGeneratorContract private tokenGeneratorContract;
    uint256 private auctionCounter = 0;

    struct Auction {
        uint256 tokenId;
        uint256 beginTimestamp;
        uint256 endTimestamp;
        bool ended;
    }

    mapping(uint256 => Auction) private auctions;

    constructor(address tokenGeneratorAddress){
        tokenGeneratorContract = TokenGeneratorContract(tokenGeneratorAddress);
    }

    function createAuction(uint256 tokenId, uint256 duration)
    public{
        require(msg.sender == tokenGeneratorContract.ownerOf(tokenId), "Only the owner of the token can auction it");
        require(duration > 60, "An auction should be active at least one minute");
        require(tokenNotAuctioned(tokenId), "Token is already auctioned");

        auctions[auctionCounter] = Auction(
            tokenId,
            block.timestamp,
            block.timestamp + duration,
            false
        );


        auctionCounter ++;
    }

    function tokenNotAuctioned(uint256 tokenId)
    private
    view
    returns (bool){
        for(uint256 i = 0; i < auctionCounter; i ++) {
            if(auctions[i].tokenId == tokenId && auctions[i].ended == false) {
                return false;
            }
        }
        return true;
    }

    function getAuctionedTokenIds()
    public
    view
    returns (uint256[] memory) {
        uint256[] memory ids = new uint256[](auctionCounter);

        for(uint256 i=0; i<auctionCounter; i ++) {
            ids[i] = auctions[i].tokenId;
        }
        return ids;
    }


    function getNumberOfAuctions()
    public
    view
    returns (uint256) {
        return auctionCounter;

    }


}
