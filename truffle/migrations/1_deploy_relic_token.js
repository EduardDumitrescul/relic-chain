const RelicToken = artifacts.require("TokenGenerator");

module.exports = function (deployer) {
  deployer.deploy(RelicToken);
};
