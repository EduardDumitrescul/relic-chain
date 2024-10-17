const RelicToken = artifacts.require("RelicToken");

module.exports = function (deployer) {
  deployer.deploy(RelicToken);
};
