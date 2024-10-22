import RelicTokenABI from "./../../contracts/RelicToken.json"


class TokenRetriever {
    #eth = null;

    constructor(eth) {
        this.#eth = eth;
    }

    async getTokenURIs() {
        try {
            const contract = this.#eth.contract;
            const tokenIds = await contract.methods.getTokenIds().call( {from: this.#eth.accounts[0]});
            const uris = await Promise.all(tokenIds.map(async (tokenId) => {
                return await contract.methods.tokenURI(tokenId).call();
            }));
            return uris;

        }
        catch (err) {
            console.log(err);
        }
    }
}

export default TokenRetriever;