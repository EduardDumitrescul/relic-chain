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
    const durationInSeconds = 7 * 24 * 60 * 60;

    beforeEach(async () => {
        tokenGenerator = await TokenGenerator.new();
        await tokenGenerator.createToken(owner, name, description);
        await tokenGenerator.createToken(owner, name, description);
        auctionHouse = await AuctionHouse.new(tokenGenerator.address);
        await auctionHouse.createAuction(1, durationInSeconds);
    })

    it("only owner can auction token", async () => {
        try {
            await auctionHouse.createAuction(2, durationInSeconds, {from: accounts[1]});
            assert.fail(false);
        }
        catch (err) {
            assert(err.message.includes("Only the owner of the token can auction it"), "Error message does not match");
        }
    })

    it("can't auction a token multiple times", async () => {
        try {
            await auctionHouse.createAuction(1, durationInSeconds);
            assert.fail(false);
        }
        catch (err) {
            assert(err.message.includes("Token is already auctioned"), "Error message does not match");
        }
    })

    it("auction counter increases", async () => {
        const actual = await auctionHouse.getNumberOfAuctions();
        const expected = 1;
        assert.equal(actual, expected);
    })

})