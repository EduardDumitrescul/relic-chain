import RelicCardModel from "./RelicCard/RelicCardModel";

class InventoryService {
    #eth = null;

    constructor(eth) {
        this.#eth = eth;
    }

    async getRelicModels() {
        try {
            const contract = this.#eth.contract;
            const tokenIds = await contract.methods.getTokenIds().call( {from: this.#eth.accounts[0]});
            const names = await Promise.all(tokenIds.map(async (tokenId) => {
                return await contract.methods.name(tokenId).call();
            }));

            let models = [];
            for(let tokenId of tokenIds) {
                let name = await contract.methods.name(tokenId).call();
                let description = await contract.methods.description(tokenId).call();
                models.push(new RelicCardModel(name, description));
            }
            return models;

        }
        catch (err) {
            console.log(err);
        }
    }
}

export default InventoryService;
