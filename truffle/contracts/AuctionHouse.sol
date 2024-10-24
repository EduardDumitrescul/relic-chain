// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

interface TokenGeneratorContract {
    function ownerOf(uint256 tokenId) external view returns(address);
    function safeTransferFrom(address from, address to, uint256 tokenId) external;
    function approve(address to, uint256 tokenId) external;
}

contract AuctionHouse {
    TokenGeneratorContract private tokenGeneratorContract;
    uint256 private auctionCounter = 0;
    address payable private auctionHouseOwner;

    struct Auction {
        address payable owner;
        uint256 tokenId;
        uint256 beginTimestamp;
        uint256 endTimestamp;
        address payable bidder;
        uint256 amountInWei;
        bool ended;
    }

    mapping(uint256 => Auction) private auctions;

    constructor(address tokenGeneratorAddress){
        tokenGeneratorContract = TokenGeneratorContract(tokenGeneratorAddress);
        auctionHouseOwner = payable(msg.sender);
    }

    function createAuction(address payable owner, uint256 tokenId, uint256 duration)
    public{
        require(msg.sender == tokenGeneratorContract.ownerOf(tokenId), "Only the owner of the token can auction it");
        require(duration > 60, "An auction should be active at least one minute");
        require(tokenNotAuctioned(tokenId), "Token is already auctioned");
        require(msg.sender == owner);

        auctions[auctionCounter] = Auction(
            owner,
            tokenId,
            block.timestamp,
            block.timestamp + duration,
            owner,
            0,
            false
        );
//        tokenGeneratorContract.approve(owner, tokenId);
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

    function placeBid(uint256 auctionId, address payable bidder) public payable {
        require(msg.sender != auctions[auctionId].owner, "Owner can't place bid");
        require(msg.value > auctions[auctionId].amountInWei, "Bid amount must be higher than last bid");
        require(auctions[auctionId].beginTimestamp <= block.timestamp && block.timestamp < auctions[auctionId].endTimestamp, "Auction must be in progress");
        require(bidder == msg.sender);

        if (auctions[auctionId].bidder != auctions[auctionId].owner) {
            // Refund the previous bidder
            auctions[auctionId].bidder.transfer(auctions[auctionId].amountInWei);
        }

        auctions[auctionId].bidder = bidder;
        auctions[auctionId].amountInWei = msg.value;
    }

    function finalizeAuction(uint256 auctionId) public {
        require(auctionHouseOwner == msg.sender, "Only the contract owner can finalize auction");
        require(auctionId < auctionCounter);
        require(auctions[auctionId].ended == false);

        address bidder = auctions[auctionId].bidder;
        uint256 bidAmount = auctions[auctionId].amountInWei;
        address payable owner = auctions[auctionId].owner;
        uint256 tokenId = auctions[auctionId].tokenId;

        if(bidder == owner) {
            return;
        }

        uint256 fee = (bidAmount * 5) / 100;
        uint256 remainingAmount = bidAmount - fee;

//        payable(address(this)).transfer(fee);
        owner.transfer(remainingAmount);
        tokenGeneratorContract.safeTransferFrom(owner, bidder, tokenId);

        auctions[auctionId].ended = true;
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

    function getBidder(uint256 auctionId) public view returns(address) {
        return auctions[auctionId].bidder;
    }

    function getBidAmount(uint256 auctionId) public view returns(uint256) {
        return auctions[auctionId].amountInWei;
    }

    function getOwnerAddress() public view returns(address) {
        return auctionHouseOwner;
    }


}
