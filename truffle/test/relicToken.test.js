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
    const name = "uri";
    const description = "uri";

    beforeEach(async () => {
        relicToken = await RelicToken.new();
    })

    describe("when a new token is created", async () => {
        let tx;
        beforeEach(async () => {
            tx = await relicToken.createToken(owner, name, description);
        });

        it("emits the AccountCreated event", async () => {
            const expectedEvent = "TokenCreated";
            const actualEvent = tx.logs[1].event;
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

        it("gets the token name", async() => {
            const actual = await relicToken.name(1);
            assert.equal(actual, name);
        })
        it("gets the token description", async() => {
            const actual = await relicToken.description(1);
            assert.equal(actual, description);
        })
    });
});

contract("RelicToken: getTokenIds", (accounts) => {
    let relicToken;

    let owner1 = accounts[1];
    let owner2 = accounts[2];

    let name1 = "1";
    let name2 = "2";
    let name3 = "3";
    let name4 = "4";

    before(async () => {
        relicToken = await RelicToken.new();
        await relicToken.createToken(owner1, name1, "");
        await relicToken.createToken(owner2, name2, "");
        await relicToken.createToken(owner1, name3, "");
        await relicToken.createToken(owner1, name4, "");
    });

    it("gets tokens filtered by owner", async () => {
        const ids = await relicToken.getTokenIds({from: owner1});
        const expected = [1, 3, 4];
        const actual = ids.map(id => id.toNumber());
        assert.deepEqual(actual, expected);
    })
})