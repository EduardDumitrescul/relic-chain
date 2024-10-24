const RelicAuction = artifacts.require("RelicAuction");

contract("RelicAuction: deployment", () => {
    it("has been deployed", async () => {
        const auction = await RelicAuction.deployed();
        assert(auction);
    })
})