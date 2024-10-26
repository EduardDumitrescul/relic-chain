import {tokenGeneratorInteractor} from "../blockchainInteractors/TokenGeneratorInteractor";
import {RelicModel} from "../models/RelicModel";

class RelicService {
    #eth = null;
    auctionHouse = null;

    constructor(eth) {
        this.#eth = eth;
        this.auctionHouse = eth.auctionHouse;
    }

    async addRelic(model) {
        await tokenGeneratorInteractor.createToken(model);
    }

    async getRelicModels() {
        return await tokenGeneratorInteractor.getTokensForCurrentAccount();
    }

    async getRelic(tokenId) {
        try {
            const name = await tokenGeneratorInteractor.getTokenName(tokenId);
            const description = await tokenGeneratorInteractor.getTokenDescription(tokenId);
            const ids = await this.auctionHouse.methods.getAuctionedTokenIds().call({from: this.account});
            const isAuctioned = ids.includes(tokenId);
            console.log(name);
            return new RelicModel(tokenId, name, description, isAuctioned);
        }
        catch (err) {
            console.log(`Error while fetching token with id=${tokenId}: ${err}`);
            return new RelicModel();
        }
    }
}

export default RelicService;