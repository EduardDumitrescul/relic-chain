import {Auction} from "../models/Auction";
import {handleTransaction} from "./handleTransaction";

export const auctionHouseInteractor = {
    initialize(state) {
        this.web3 = state.web3;
        this.account = state.accounts[0];
        this.auctionHouse = state.auctionHouse;
        this.toWei = state.web3.utils.toWei;
    },

    ready() {
        return this.auctionHouse != null;
    },

    async createAuction(auction) {
        return await handleTransaction(
            this.web3,
            this.auctionHouse.methods
                .createAuction(this.account, auction.tokenId, auction.duration())
                .send({from: this.account})
        );
    },

    async getAuctions() {
        try {
            const numberOfAuctions = await this.getNumberOfAuctions();

            let auctions = [];
            for(let id = 0; id < numberOfAuctions; id ++) {
                let auction = await this.getAuction(id);
                auctions.push(auction);
            }
            return auctions;
        }
        catch (err) {
            console.log(`Error while trying to fetch auctions: ${err}`);
            return [];
        }
    },

    async getAuction(auctionId) {
        try {
            let auction = await this.auctionHouse.methods
                .getAuction(auctionId)
                .call();
            return new Auction(
                auctionId,
                auction.beginTimestamp,
                auction.endTimestamp,
                auction.tokenId,
                "tokenName",
                "tokenDescription",
                "tokenOwner",
                auction.lastBidder,
                auction.lastBidAmountInWei,
                auction.hasFinalized
            );
        }
        catch (err) {
            console.log(`Error while fetching auction with id=${auctionId}: ${err}`);
            return new Auction();
        }
    },

    async getNumberOfAuctions() {
        try {
            const numberOfAuctions = await this.auctionHouse.methods
                .getNumberOfAuctions()
                .call();
            return numberOfAuctions;
        }
        catch (err) {
            console.log(`Error while fetching number of auctions: ${err}`);
            return 0;
        }
    },

    async placeBid(auctionId, bidAmount) {
        try {
            await this.auctionHouse.methods
                .placeBid(auctionId, this.account)
                .send({
                    from: this.account,
                    value: this.toWei(bidAmount.toString(), "ether")
                });
        } catch (err) {
            console.error(`Error while placing bid=${bidAmount} on auctionId=${auctionId}: ${err}`);
        }
    },

    async finalize(auctionId) {
        return await handleTransaction(
            this.web3,
            this.auctionHouse.methods
                .finalizeAuction(auctionId)
                .send({from: this.account})
        );
    },

    async isTokenAuctioned(tokenId) {
        try {
            return await this.auctionHouse.methods
                .isTokenAuctioned(tokenId)
                .call();
        } catch (err) {
            console.error(`Error while checking if token ${tokenId} is auctioned: ${err}`);
            return false;
        }
    },

    listenForBidPlaced(callback) {
        this.auctionHouse.events.BidPlaced({}, (error, event) => {
            if (error) {
                console.error("Error listening for TokenCreated events:", error);
                return;
            }
            callback(event.returnValues);
        });
    }
}