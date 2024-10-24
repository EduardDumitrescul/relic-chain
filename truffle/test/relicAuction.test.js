const RelicAuction = artifacts.require("RelicAuction");
const RelicToken = artifacts.require("RelicToken");

contract("RelicAuction: deployment", () => {
    it("has been deployed", async () => {
        const auction = await RelicAuction.deployed();
        assert(auction);
    })
})

contract("RelicAuction: auctionToken", (accounts) => {
    let token;
    let auction;
    const owner = accounts[0];
    const name = "name";
    const description = "description";

    beforeEach(async () => {
        token = await RelicToken.new();
        await token.createToken(owner, name, description);
        auction = await RelicAuction.new();
        await auction.auctionToken(1);
    })

    it("gets auctioned tokens", async () => {
        const actual = await auction.getAuctionedTokenIds();
        const expected = 1;
        assert.equal(actual, expected);
    })

})