const RelicToken = artifacts.require('RelicToken');

contract("RelicToken: deployment", () => {
    it("has been deployed", async () => {
        const token = await RelicToken.deployed();
        assert(token)
    })
})

contract("RelicToken: createToken", (accounts) => {
    let relicToken;
    const owner = accounts[1];  // Token owner
    const uri = "uri";

    beforeEach(async () => {
        relicToken = await RelicToken.new();
    })

    describe("when a new token is created", async () => {
        let tx;
        beforeEach(async () => {
            tx = await relicToken.createToken(owner, uri);
        });

        it("emits the AccountCreated event", async () => {
            const expectedEvent = "TokenCreated";
            const actualEvent = tx.logs[2].event;
            assert.equal(actualEvent, expectedEvent);
        })

        it("assigns the token to the correct owner", async () => {
            const tokenOwner = await relicToken.ownerOf(1);  // Check owner
            assert.equal(tokenOwner, owner, "Token owner should match the expected owner");
        });

        it("increments the token count", async () => {
            const actual = await relicToken.tokenCount();  // Fetch token count
            assert.equal(actual.toNumber(), 1, "Token count should be 1 after minting");
        });

        it("gets the token uri", async() => {
            const actual = await relicToken.tokenURI(1);
            assert.equal(actual, uri);
        })
    });


    describe("when multiple tokens are created", async () => {
        let owner1 = accounts[1];
        let owner2 = accounts[2];

        let uri1 = "1";
        let uri2 = "2";
        let uri3 = "3";
        let uri4 = "4";

        beforeEach(async () => {
            await relicToken.createToken(owner1, uri1);
            await relicToken.createToken(owner2, uri2);
            await relicToken.createToken(owner1, uri3);
            await relicToken.createToken(owner1, uri4);
        });

        it("gets tokens filtered by owner", async () => {
            const ids = await relicToken.getTokenIds(owner1);
            const expected = [1, 3, 4];
            const actual = ids.map(id => id.toNumber());
            assert.deepEqual(actual, expected);
        })
    })
});