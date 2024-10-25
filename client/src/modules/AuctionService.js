import {Auction} from "./auction/Auction";

export class AuctionService {
    auctionHouse = null;
    tokenGenerator =  null;
    account = null;
    auctionHouseAddress = null;

    constructor(eth) {
        this.eth = eth;
        this.auctionHouse = this.eth.auctionHouse;
        this.tokenGenerator = this.eth.tokenGenerator;
        this.account = this.eth.accounts[0];
        this.auctionHouseAddress = this.eth.auctionHouseAddress;
    }

    async createAuction(auction) {
        try {
            await this.tokenGenerator.methods
                .approve(this.auctionHouseAddress, auction.tokenId)
                .send({from: this.account});
            await this.auctionHouse.methods
                .createAuction(this.account, auction.tokenId, auction.duration())
                .send({from: this.account});
        }
        catch(err) {
            console.log(err);
        }
        // await this.getAuctionIds();
    }

    async getAuctions() {
        try {
            const numberOfAuctions = await this.auctionHouse.methods.getNumberOfAuctions().call({from: this.account});

            let auctions = [];
            for(let id = 0; id < numberOfAuctions; id ++) {
                let auction = await this.getAuction(id);
                auctions.push(auction);
            }
            return auctions;
        }
        catch (err) {
            console.log(err);
            return [];
        }
    }

    async getAuction(id) {
        let auction = await this.auctionHouse.methods.getAuction(id).call({from: this.account});
        let tokenName = await this.tokenGenerator.methods.name(auction.tokenId).call({from: this.account});
        let tokenDesc = await this.tokenGenerator.methods.description(auction.tokenId).call({from: this.account});
        return new Auction(
            id,
            auction.beginTimestamp,
            auction.endTimestamp,
            auction.tokenId,
            tokenName,
            tokenDesc,
            auction.bidder,
            auction.bidAmount,
        );
    }

}