const RelicGenerator = artifacts.require("TokenGenerator");
const RelicAuction = artifacts.require("AuctionHouse");

module.exports = async function (deployer) {
    // Deploy the RelicGenerator contract and wait for the deployment to complete
    await deployer.deploy(RelicGenerator);

    // Get the deployed instance of RelicGenerator
    const relicGeneratorInstance = await RelicGenerator.deployed();

    // Now deploy the RelicAuction contract, passing the address of the deployed RelicGenerator
    await deployer.deploy(RelicAuction, relicGeneratorInstance.address);
};
