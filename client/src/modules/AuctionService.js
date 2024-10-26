import {Auction} from "../models/Auction";
import {tokenGeneratorInteractor} from "../blockchainInteractors/TokenGeneratorInteractor";

export class AuctionService {
    auctionHouse = null;
    account = null;
    auctionHouseAddress = null;

    constructor(eth) {
        this.eth = eth;
        this.auctionHouse = this.eth.auctionHouse;
        this.account = this.eth.accounts[0];
        this.auctionHouseAddress = this.eth.auctionHouseAddress;
        this.tokenGeneratorAddress = this.eth.tokenGeneratorAddress;
    }

    async createAuction(auction) {
        try {

            await tokenGeneratorInteractor.approve(this.auctionHouseAddress, auction.tokenId);
            // await tokenGeneratorInteractor.approve(this.tokenGeneratorAddress, auction.tokenId);
            await this.auctionHouse.methods
                .createAuction(this.account, auction.tokenId, auction.duration())
                .send({from: this.account});
        }
        catch(err) {
            console.log(err);
        }
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
        const tokenName = await tokenGeneratorInteractor.getTokenName(auction.tokenId);
        const tokenDesc = await tokenGeneratorInteractor.getTokenDescription(auction.tokenId);
        const tokenOwner = await tokenGeneratorInteractor.getTokenOwner(auction.tokenId);
        return new Auction(
            id,
            auction.beginTimestamp,
            auction.endTimestamp,
            auction.tokenId,
            tokenName,
            tokenDesc,
            tokenOwner,
            auction.lastBidder,
            auction.bidAmountInWei,
            auction.hasFinalized
        );
    }

    async finalize(auctionId) {
        try {
            await this.auctionHouse.methods
                .finalizeAuction(auctionId)
                .send({from: this.account});
        }
        catch(err) {
            console.log(err);
        }
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