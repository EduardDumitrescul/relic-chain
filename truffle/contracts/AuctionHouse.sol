pragma solidity ^0.8.10;

interface TokenGeneratorContract {
    function ownerOf(uint256 tokenId) external view returns(address);
    function transferToken(address from, address to, uint256 tokenId) external;
}

contract AuctionHouse {
    TokenGeneratorContract private tokenGeneratorContract;
    uint256 private auctionCounter = 0;
    address payable private auctionHouseOwner;

    event BidPlaced(address);
    event TokenTransferred(uint256);
    event MoneyTransferred(uint256);
    event SendingToken(address);

    struct Auction {
        address payable tokenOwner;
        uint256 tokenId;
        uint256 beginTimestamp;
        uint256 endTimestamp;
        address payable lastBidder;
        uint256 lastBidAmountInWei;
        bool hasFinalized;
    }

    mapping(uint256 => Auction) private auctions;

    constructor(address tokenGeneratorAddress){
        tokenGeneratorContract = TokenGeneratorContract(tokenGeneratorAddress);
        auctionHouseOwner = payable(msg.sender);
    }

    modifier onlyTokenOwner(uint256 tokenId){
        require(msg.sender == tokenGeneratorContract.ownerOf(tokenId), "Only the owner of the token can auction it");
        _;
    }

    function createAuction(address payable owner, uint256 tokenId, uint256 duration)
    external onlyTokenOwner (tokenId){
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
        auctionCounter ++;
    }

    function tokenNotAuctioned(uint256 tokenId)
    internal view returns (bool){
        for(uint256 i = 0; i < auctionCounter; i ++) {
            if(auctions[i].tokenId == tokenId && auctions[i].hasFinalized == false) {
                return false;
            }
        }
        return true;
    }

    modifier onlyNotTokenOwner(uint256 auctionId) {
        require(msg.sender != auctions[auctionId].tokenOwner, "Owner can't place bid");
        _;
    }

    function placeBid(uint256 auctionId, address payable bidder)
    external payable onlyNotTokenOwner(auctionId) {
        require(msg.value > auctions[auctionId].lastBidAmountInWei, "Bid amount must be higher than last bid");
        require(auctions[auctionId].beginTimestamp <= block.timestamp && block.timestamp < auctions[auctionId].endTimestamp, "Auction must be in progress");

        if (auctions[auctionId].lastBidder != auctions[auctionId].tokenOwner) {
            // Refund the previous bidder
            auctions[auctionId].lastBidder.transfer(auctions[auctionId].lastBidAmountInWei);
        }

        auctions[auctionId].lastBidder = bidder;
        auctions[auctionId].lastBidAmountInWei = msg.value;

        emit BidPlaced(bidder);
    }

    modifier tokenTransferred(uint256 auctionId){
        _;
        require(tokenGeneratorContract.ownerOf(auctions[auctionId].tokenId) == auctions[auctionId].lastBidder, "Token transffered to last bidder");
    }

    function finalizeAuction(uint256 auctionId)
    public tokenTransferred(auctionId) {
        require(auctions[auctionId].tokenOwner == msg.sender, "Only the token owner can finalize auction");
        require(auctionId < auctionCounter, "Auction exists");
        require(auctions[auctionId].hasFinalized == false, "Auction is in progress");
        require(msg.sender == tokenGeneratorContract.ownerOf(auctions[auctionId].tokenId), "Token owner is calling");

        address bidder = auctions[auctionId].lastBidder;
        uint256 bidAmount = auctions[auctionId].lastBidAmountInWei;
        address payable owner = auctions[auctionId].tokenOwner;
        uint256 tokenId = auctions[auctionId].tokenId;

        if(bidder == owner) {
            // No bid
            auctions[auctionId].hasFinalized = true;
            return;
        }

        uint256 remainingAmount = subtractFee(bidAmount);

        owner.transfer(remainingAmount);
        emit MoneyTransferred(remainingAmount);

        tokenGeneratorContract.transferToken(owner, bidder, tokenId);
        auctions[auctionId].hasFinalized = true;
        emit TokenTransferred(tokenId);
    }

    function subtractFee(uint256 amount) internal pure returns(uint256) {
        uint256 feePercentage = 5;
        return (amount * (100 - feePercentage)) / 100;
    }

    function getAuctionedTokenIds()
    external view returns (uint256[] memory) {
        uint256[] memory ids = new uint256[](auctionCounter);

        for(uint256 i=0; i<auctionCounter; i ++) {
            ids[i] = auctions[i].tokenId;
        }
        return ids;
    }

    function getAuction(uint256 auctionId) external view returns (Auction memory) {
        return auctions[auctionId];
    }


    function getNumberOfAuctions()
    external view returns (uint256) {
        return auctionCounter;

    }

    function getBidder(uint256 auctionId) public view returns(address) {
        return auctions[auctionId].lastBidder;
    }

    function getBidAmount(uint256 auctionId) public view returns(uint256) {
        return auctions[auctionId].lastBidAmountInWei;
    }

    function getOwnerAddress() public view returns(address) {
        return auctionHouseOwner;
    }


}
