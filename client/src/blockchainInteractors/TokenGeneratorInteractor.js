import {RelicModel} from "../models/RelicModel";
import {handleTransaction} from "./handleTransaction";

export const tokenGeneratorInteractor = {

    initialize(state) {
        console.log("init" + state);
        this.web3 = state.web3;
        this.account = state.accounts[0];
        this.tokenGenerator = state.tokenGenerator;
    },

    ready() {
        return this.tokenGenerator != null;
    },

    async createToken(model) {
        return await handleTransaction(
            this.web3,
            this.tokenGenerator.methods
                .createToken(this.account, model.name, model.description)
                .send({from: this.account})
        );
    },

    async getTokensForCurrentAccount() {
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
        return await handleTransaction(
            this.web3,
            this.tokenGenerator.methods
                .approve(address, tokenId)
                .send({from: this.account})
        );
    },

    listenForTokenCreated(callback) {
        this.tokenGenerator.events.TokenCreated({}, (error, event) => {
            if (error) {
                console.error("Error listening for TokenCreated events:", error);
                return;
            }
            callback(event.returnValues);
        });
    }

}