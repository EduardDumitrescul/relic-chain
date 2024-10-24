
class RelicService {
    #eth = null;

    constructor(eth) {
        this.#eth = eth;
    }

    async addRelic(model) {
        try {
            console.log("RelicService.addRelic()\n" + model.toString());
            const tokenGenerator = this.#eth.tokenGenerator;
            const account = this.#eth.accounts[0];
            await tokenGenerator.methods.createToken(account, model.name, model.description).send({from: account});
        }
        catch (err) {
            console.log(err)
        }
    }
}

export default RelicService;