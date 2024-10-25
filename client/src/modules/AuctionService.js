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
        const web3 =this.eth.web3;

        let auction = await this.auctionHouse.methods.getAuction(id).call({from: this.account});
        let tokenName = await this.tokenGenerator.methods.name(auction.tokenId).call({from: this.account});
        let tokenDesc = await this.tokenGenerator.methods.description(auction.tokenId).call({from: this.account});
        let tokenOwner = await this.tokenGenerator.methods.ownerOf(auction.tokenId).call({form: this.account});
        return new Auction(
            id,
            auction.beginTimestamp,
            auction.endTimestamp,
            auction.tokenId,
            tokenName,
            tokenDesc,
            tokenOwner,
            auction.bidder,
            auction.amountInWei
        );
    }

    async placeBid(auctionId, bidAmount) {
        try {
            if (!bidAmount || bidAmount <= 0)
                throw new Error("Invalid bid amount.");

            const account = this.eth.accounts[0];
            const auctionHouse = this.eth.auctionHouse;
            const web3 = this.eth.web3;

            await auctionHouse.methods.placeBid(auctionId, account)
                .send({ from: account, value: web3.utils.toWei(bidAmount.toString(), "ether") });
        } catch (error) {
            console.error("Error placing bid:", error);
            throw error;
        }
    }

}