export class Auction {
    constructor(
        id = 0,
        beginTimestamp = 0,
        endTimestamp = 0,
        tokenId = 0,
        tokenName = "name",
        tokenDescription = "desc",
        tokenOwner = 0,
        bidder = 0,
        bidAmount = 0,
        ended = false,
        tokenImageSource = "/images/relic-card-default.jpg",
    ) {
        this.id = id;
        this.beginTimestamp = beginTimestamp;
        this.endTimestamp = endTimestamp;
        this.tokenId = tokenId;
        this.tokenName = tokenName;
        this.tokenDescription = tokenDescription;
        this.tokenImageSource = tokenImageSource;
        this.tokenOwner = tokenOwner;
        this.bidder = bidder;
        this.bidAmount = bidAmount;
        this.ended = ended;
    }
}