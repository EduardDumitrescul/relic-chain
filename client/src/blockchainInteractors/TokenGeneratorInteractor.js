import {RelicModel} from "../models/RelicModel";

export const tokenGeneratorInteractor = {

    initialize(state) {
        console.log("init" + state);
        this.account = state.accounts[0];
        this.tokenGenerator = state.tokenGenerator;
    },

    ready() {
        return this.tokenGenerator != null;
    },

    async createToken(model) {
        try {
            await this.tokenGenerator.methods
                .createToken(this.account, model.name, model.description)
                .send({from: this.account});
        }
        catch (err) {
            console.log(`Error while trying to create token: ${err}`);
        }
    },

    async getTokensForCurrentAccount() {
        console.log(this.tokenGenerator);
        try {
            const tokenIds = await this.tokenGenerator.methods
                .getTokenIds()
                .call({from: this.account});

            let models = [];
            for(let tokenId of tokenIds) {
                let model = await this.getToken(tokenId);
                models.push(model);
            }
            return models;
        }
        catch (err) {
            console.log(`Error while fetching tokens for current account: ${err}`);
            return [];
        }
    },

    async getToken(tokenId) {
        try {
            const name = await this.tokenGenerator.methods.name(tokenId).call();
            const description = await this.tokenGenerator.methods.description(tokenId).call();
            return new  RelicModel(tokenId, name, description);
        }
        catch (err) {
            console.log(`Error while fetching token name with id=${tokenId}: ${err}`);
            return new RelicModel(tokenId);
        }
    },

    async getTokenName(tokenId) {
        try {
            const name = await this.tokenGenerator.methods.name(tokenId).call();
            return name;
        }
        catch (err) {
            console.log(`Error while fetching token name with id=${tokenId}: ${err}`);
            return ""
        }
    },

    async getTokenDescription(tokenId) {
        try {
            const description = await this.tokenGenerator.methods.name(tokenId).call();
            return description;
        }
        catch (err) {
            console.log(`Error while fetching token description with id=${tokenId}: ${err}`);
            return ""
        }
    },

    async getTokenOwner(tokenId) {
        try {
            const owner = this.tokenGenerator.methods
                .ownerOf(tokenId)
                .call();
            return owner;
        }
        catch (err) {
            console.log(`Error while fetching token ${tokenId} owner: ${err}`);
            return 0;
        }
    },

    async approve(address, tokenId) {
        try {
            this.tokenGenerator.methods
                .approve(address, tokenId)
                .send({from: this.account});
        }
        catch (err) {
            console.log(`Error while approving address=${address} for tokenId=${tokenId}: ${err}`);
        }
    }

}