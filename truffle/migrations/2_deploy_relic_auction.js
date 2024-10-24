const RelicAuction = artifacts.require("AuctionHouse");

module.exports = function (deployer) {
    deployer.deploy(RelicAuction);
};
