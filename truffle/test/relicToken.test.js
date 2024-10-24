const TokenGenerator = artifacts.require('TokenGenerator');

contract("TokenGenerator.sol: deployment", () => {
    it("has been deployed", async () => {
        const token = await TokenGenerator.deployed();
        assert(token)
    })
})

contract("TokenGenerator.sol: createToken", (accounts) => {
    let tokenGenerator;
    const owner = accounts[1];  // Token owner
    const name = "uri";
    const description = "uri";

    beforeEach(async () => {
        tokenGenerator = await TokenGenerator.new();
    })

    describe("when a new token is created", async () => {
        let tx;
        beforeEach(async () => {
            tx = await tokenGenerator.createToken(owner, name, description);
        });

        it("emits the AccountCreated event", async () => {
            const expectedEvent = "TokenCreated";
            const actualEvent = tx.logs[1].event;
            assert.equal(actualEvent, expectedEvent);
        })

        it("assigns the token to the correct owner", async () => {
            const tokenOwner = await tokenGenerator.ownerOf(1);  // Check owner
            assert.equal(tokenOwner, owner, "Token owner should match the expected owner");
        });

        it("increments the token count", async () => {
            const actual = await tokenGenerator.tokenCount();  // Fetch token count
            assert.equal(actual.toNumber(), 1, "Token count should be 1 after minting");
        });

        it("gets the token name", async() => {
            const actual = await tokenGenerator.name(1);
            assert.equal(actual, name);
        })
        it("gets the token description", async() => {
            const actual = await tokenGenerator.description(1);
            assert.equal(actual, description);
        })
    });
});

contract("TokenGenerator.sol: getTokenIds", (accounts) => {
    let relicToken;

    let owner1 = accounts[1];
    let owner2 = accounts[2];

    let name1 = "1";
    let name2 = "2";
    let name3 = "3";
    let name4 = "4";

    before(async () => {
        relicToken = await TokenGenerator.new();
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