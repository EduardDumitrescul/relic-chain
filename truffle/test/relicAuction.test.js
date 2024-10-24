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
        await auctionHouse.createAuction(owner, 1, durationInSeconds);
    })

    it("only owner can auction token", async () => {
        try {
            await auctionHouse.createAuction(accounts[1], 2, durationInSeconds, {from: accounts[1]});
            assert.fail(false);
        }
        catch (err) {
            assert(err.message.includes("Only the owner of the token can auction it"), "Error message does not match");
        }
    })

    it("can't auction a token multiple times", async () => {
        try {
            await auctionHouse.createAuction(owner, 1, durationInSeconds);
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

contract("AuctionHouse.sol: bid", (accounts) => {
    let tokenGenerator;
    let auctionHouse;
    const owner = accounts[0];
    const name = "name";
    const description = "description";
    const durationInSeconds = 7 * 24 * 60 * 60;
    const bidder = accounts[1];
    const bidder2 = accounts[2];
    const bidAmount = web3.utils.toWei("1", "ether");
    const bidAmount2 = web3.utils.toWei("2", "ether");
    const auctionId = 0;

    beforeEach(async () => {
        tokenGenerator = await TokenGenerator.new();
        await tokenGenerator.createToken(owner, name, description);
        await tokenGenerator.createToken(owner, name, description);
        auctionHouse = await AuctionHouse.new(tokenGenerator.address);
        await auctionHouse.createAuction(owner, 1, durationInSeconds);
    })

    it("updates current bidder", async () => {
        await auctionHouse.placeBid(auctionId, bidder, {from: bidder, value: bidAmount});

        const actualBidder = await auctionHouse.getBidder(auctionId);
        const actualAmount =  await auctionHouse.getBidAmount(auctionId);

        assert.equal(actualBidder, bidder);
        assert.equal(actualAmount, bidAmount);
    })

    it("owner can't place bid", async () => {
        try {
            await auctionHouse.placeBid(auctionId, owner, {from: owner, value: bidAmount});
            assert.fail(false);
        }
        catch (err) {
            assert(err.message.includes("Owner can't place bid"), "Error message does not match");
        }
    })

    it("bid amount must be higher than last bid", async () => {
        try {
            await auctionHouse.placeBid(auctionId, bidder, {from: bidder, value: bidAmount});
            await auctionHouse.placeBid(auctionId, bidder, {from: bidder, value: bidAmount});
            assert.fail(false);
        }
        catch (err) {
            assert(err.message.includes("Bid amount must be higher than last bid"), "Error message does not match");
        }
    })

    it("bid returns when higher bid is placed", async () => {
        const initialBidderBalance = await web3.eth.getBalance(bidder);

        const tx = await auctionHouse.placeBid(auctionId, bidder, {from: bidder, value: bidAmount});
        await auctionHouse.placeBid(auctionId, bidder2, {from: bidder2, value: bidAmount2});

        const finalBidderBalance = await web3.eth.getBalance(bidder);

        const gasCost = web3.utils.toBN(tx.receipt.gasUsed).mul(web3.utils.toBN(tx.receipt.effectiveGasPrice));
        const expectedBalance = web3.utils.toBN(initialBidderBalance).sub(gasCost);
        assert.equal(finalBidderBalance.toString(), expectedBalance.toString(), "Previous bidder should have their bid refunded");

    })
})