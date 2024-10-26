import {Auction} from "../models/Auction";
import {tokenGeneratorInteractor} from "../blockchainInteractors/TokenGeneratorInteractor";
import {auctionHouseInteractor} from "../blockchainInteractors/AuctionHouseInteractor";

export class AuctionService {
    constructor(eth) {
        this.auctionHouseAddress = eth.auctionHouseAddress;
        this.tokenGeneratorAddress = eth.tokenGeneratorAddress;
    }

    async createAuction(auction) {
        await tokenGeneratorInteractor.approve(this.auctionHouseAddress, auction.tokenId);
        // await tokenGeneratorInteractor.approve(this.tokenGeneratorAddress, auction.tokenId);
        await auctionHouseInteractor.createAuction(auction);
    }

    async getAuctions() {
        const auctions = await auctionHouseInteractor.getAuctions();
        for(let i = 0; i < auctions.length; i++) {
            auctions[i] = await this.getAuction(auctions[i].id);
        }
        return auctions;
    }

    async getAuction(id) {
        const auction = await auctionHouseInteractor.getAuction(id);
        const token = await tokenGeneratorInteractor.getToken(auction.tokenId);
        const tokenOwner = await tokenGeneratorInteractor.getTokenOwner(token.id);

        return new Auction(
            id,
            auction.beginTimestamp,
            auction.endTimestamp,
            auction.tokenId,
            token.name,
            token.description,
            tokenOwner,
            auction.lastBidder,
            auction.lastBidAmountInWei,
            auction.hasFinalized
        );
    }

    async finalize(auctionId) {
        await auctionHouseInteractor.finalize(auctionId);
    }

    async placeBid(auctionId, bidAmount) {
        await auctionHouseInteractor.placeBid(auctionId, bidAmount);
    }

}