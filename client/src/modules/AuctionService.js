import {Auction} from "./auction/Auction";

export class AuctionService {
    auctionHouse = null;
    tokenGenerator =  null;
    account = null;
    auctionHouseAddress = null;

    constructor(eth) {
        console.log(eth);
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
            const ids = await this.auctionHouse.methods.getAuctionedTokenIds().call({from: this.account});
            let auctions = [];
            for(let id of ids) {
                auctions.push(new Auction(id));
            }
            return auctions;
        }
        catch (err) {
            console.log(err);
            return [];
        }
    }
}