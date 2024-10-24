const AuctionHouse = artifacts.require("AuctionHouse");
const TokenGenerator = artifacts.require("TokenGenerator");

contract("AuctionHouse.sol: deployment", () => {
    it("has been deployed", async () => {
        const auction = await AuctionHouse.deployed();
        assert(auction);
    })
})

contract("AuctionHouse.sol: auctionToken", (accounts) => {
    let tokenGenerator;
    let auctionHouse;
    const owner = accounts[0];
    const name = "name";
    const description = "description";

    beforeEach(async () => {
        tokenGenerator = await TokenGenerator.new();
        await tokenGenerator.createToken(owner, name, description);
        auctionHouse = await AuctionHouse.new();
        await auctionHouse.createAuction(1);
    })

    it("gets auctioned tokens", async () => {
        const actual = await auctionHouse.getAuctionedTokenIds();
        const expected = 1;
        assert.equal(actual, expected);
    })

})