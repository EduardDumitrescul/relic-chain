const RelicToken = artifacts.require('RelicToken');

contract("RelicToken: deployment", () => {
    it("has been deployed", async () => {
        const token = await RelicToken.deployed();
        assert(token)
    })
})

contract("RelicToken: createToken", (accounts) => {
    let relicToken;
    const owner = accounts[1];

    beforeEach(async () => {
        relicToken = await  RelicToken.deployed();
        await relicToken.createToken(owner)
    })

    it("increments the token count", async () => {
        const actual = await relicToken.tokenCount()
        assert.equal(actual, 1)
    })


})