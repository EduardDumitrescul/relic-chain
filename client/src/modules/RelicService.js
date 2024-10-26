import {tokenGeneratorInteractor} from "../blockchainInteractors/TokenGeneratorInteractor";
import {RelicModel} from "../models/RelicModel";
import {auctionHouseInteractor} from "../blockchainInteractors/AuctionHouseInteractor";
import {imageDataSource} from "../ipfs/ImageDataSource";

class RelicService {
    #eth = null;
    auctionHouse = null;

    constructor(eth) {
        this.#eth = eth;
        this.auctionHouse = eth.auctionHouse;
    }

    async addRelic(model, image) {
        if(image != null) {
            model.imageSource = await imageDataSource.uploadImage(image);
        }
        await tokenGeneratorInteractor.createToken(model);
    }

    async getRelicModels() {
        return await tokenGeneratorInteractor.getTokensForCurrentAccount();
    }

    async getRelic(tokenId) {
        try {
            const token = await tokenGeneratorInteractor.getToken(tokenId);
            token.isAuctioned = await auctionHouseInteractor.isTokenAuctioned(tokenId);
            return token;
        }
        catch (err) {
            console.log(`Error while fetching token with id=${tokenId}: ${err}`);
            return new RelicModel();
        }
    }

    listenForTokenCreated(callback) {
        tokenGeneratorInteractor.listenForTokenCreated(callback);
    }
}

export default RelicService;