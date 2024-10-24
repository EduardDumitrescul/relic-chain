import RelicCardModel from "./RelicCard/RelicCardModel";

class InventoryService {
    #eth = null;

    constructor(eth) {
        this.#eth = eth;
    }

    async getRelicModels() {
        try {
            const tokenGenerator = this.#eth.tokenGenerator;
            const tokenIds = await tokenGenerator.methods.getTokenIds().call( {from: this.#eth.accounts[0]});
            console.log(tokenIds);
            let models = [];
            for(let tokenId of tokenIds) {
                let name = await tokenGenerator.methods.name(tokenId).call();
                let description = await tokenGenerator.methods.description(tokenId).call();
                models.push(new RelicCardModel(tokenId, name, description));
            }
            return models;

        }
        catch (err) {
            console.log(err);
        }
    }
}

export default InventoryService;
