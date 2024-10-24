import {RelicModel} from "./RelicModel";

class RelicService {
    #eth = null;

    constructor(eth) {
        this.#eth = eth;
    }

    async addRelic(model) {
        try {
            const tokenGenerator = this.#eth.tokenGenerator;
            const account = this.#eth.accounts[0];
            await tokenGenerator.methods.createToken(account, model.name, model.description).send({from: account});
        }
        catch (err) {
            console.log(err)
        }
    }

    async getRelicModels() {
        try {
            const tokenGenerator = this.#eth.tokenGenerator;
            const tokenIds = await tokenGenerator.methods.getTokenIds().call( {from: this.#eth.accounts[0]});
            console.log(tokenIds);
            let models = [];
            for(let tokenId of tokenIds) {
                let model = await this.getRelic(tokenId);
                models.push(model);
            }
            return models;

        }
        catch (err) {
            console.log(err);
        }
    }

    async getRelic(tokenId) {
        try {
            const tokenGenerator = this.#eth.tokenGenerator;
            let name = await tokenGenerator.methods.name(tokenId).call();
            let description = await tokenGenerator.methods.description(tokenId).call();
            return new RelicModel(tokenId, name, description);
        }
        catch (err) {
            console.log(err);
            return new RelicModel();
        }

    }
}

export default RelicService;