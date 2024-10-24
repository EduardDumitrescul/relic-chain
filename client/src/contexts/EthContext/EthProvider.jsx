import React, { useReducer, useCallback, useEffect } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";

function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const init = useCallback(
    async (tokenGeneratorArtifact, auctionHouseArtifact) => {
      if (tokenGeneratorArtifact && auctionHouseArtifact) {
        const web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");
        const accounts = await web3.eth.requestAccounts();
        const balance = await web3.eth.getBalance(accounts[0]);
        const networkID = await web3.eth.net.getId();
        const tokenGeneratorAbi = tokenGeneratorArtifact.abi;
        const auctionHouseAbi = auctionHouseArtifact.abi;
        let tokenGeneratorAddress, tokenGenerator;
        let auctionHouseAddress, auctionHouse;
        try {
          tokenGeneratorAddress = tokenGeneratorArtifact.networks[networkID].address;
          auctionHouseAddress = auctionHouseArtifact.networks[networkID].address;
          auctionHouse = new web3.eth.Contract(auctionHouseAbi, auctionHouseAddress)
          tokenGenerator = new web3.eth.Contract(tokenGeneratorAbi, tokenGeneratorAddress);

        } catch (err) {
          console.error(err);
        }
        dispatch({
          type: actions.init,
          data: {
            tokenGeneratorArtifact: tokenGeneratorArtifact,
            tokenGeneratorAddress: tokenGeneratorAddress,
            auctionHouseArtifact: auctionHouseArtifact,
            auctionHouseAddress: auctionHouseAddress,
            web3,
            accounts,
            balance,
            networkID,
            tokenGenerator: tokenGenerator,
            auctionHouse: auctionHouse
          }
        });
      }
    }, []);

  useEffect(() => {
    const tryInit = async () => {
      try {
        const auctionHouseArtifact = require("../../contracts/AuctionHouse.json");
        const tokenGeneratorArtifact = require("../../contracts/TokenGenerator.json");
        await init(tokenGeneratorArtifact, auctionHouseArtifact);
      } catch (err) {
        console.error(err);
      }
    };

    tryInit();
  }, [init]);

  useEffect(() => {
    const events = ["chainChanged", "accountsChanged"];
    const handleChange = () => {
      init(state.artifact);
    };

    events.forEach(e => window.ethereum.on(e, handleChange));
    return () => {
      events.forEach(e => window.ethereum.removeListener(e, handleChange));
    };
  }, [init, state.artifact]);

  return (
    <EthContext.Provider value={{
      state,
      dispatch
    }}>
      {children}
    </EthContext.Provider>
  );
}

export default EthProvider;
