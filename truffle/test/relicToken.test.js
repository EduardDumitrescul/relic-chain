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

    describe("when a new token is created", async () => {
        let tx;
        beforeEach(async () => {
            relicToken = await RelicToken.new();
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
});