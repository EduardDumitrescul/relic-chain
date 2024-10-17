const relicToken = artifacts.require('RelicToken');

contract("RelicToken: deployment", () => {
    it("has been deployed", async () => {
        const token = await relicToken.deployed();
        assert(token)
    })
})