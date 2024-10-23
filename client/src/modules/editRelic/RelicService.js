
class RelicService {
    #eth = null;

    constructor(eth) {
        this.#eth = eth;
    }

    async addRelic(model) {
        try {
            console.log("RelicService.addRelic()\n" + model.toString());
            const contract = this.#eth.contract;
            const account = this.#eth.accounts[0];
            await contract.methods.createToken(account, model.name, model.description).send({from: account});
        }
        catch (err) {
            console.log(err)
        }
    }
}

export default RelicService;