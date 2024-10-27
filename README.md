## Partea 1: Implementarea smart-contractelor

### Cerințe obligatorii (maxim 3 puncte) – minim pentru promovare
- Utilizarea tipurilor de date specifice Solidity (mappings, address).
  - mapping: https://github.com/EduardDumitrescul/relic-chain/blob/16d4fb56ad34407ec6e7364ecfdef54f8a75ef8c/truffle/contracts/AuctionHouse.sol#L30
  - struct with address payable: https://github.com/EduardDumitrescul/relic-chain/blob/16d4fb56ad34407ec6e7364ecfdef54f8a75ef8c/truffle/contracts/AuctionHouse.sol#L20-L28
- Înregistrarea de events.
  - TokenCreated: https://github.com/EduardDumitrescul/relic-chain/blob/16d4fb56ad34407ec6e7364ecfdef54f8a75ef8c/truffle/contracts/TokenGenerator.sol#L8
   https://github.com/EduardDumitrescul/relic-chain/blob/16d4fb56ad34407ec6e7364ecfdef54f8a75ef8c/truffle/contracts/TokenGenerator.sol#L26
  - BidPlaced: https://github.com/EduardDumitrescul/relic-chain/blob/16d4fb56ad34407ec6e7364ecfdef54f8a75ef8c/truffle/contracts/AuctionHouse.sol#L15
    https://github.com/EduardDumitrescul/relic-chain/blob/16d4fb56ad34407ec6e7364ecfdef54f8a75ef8c/truffle/contracts/AuctionHouse.sol#L88
- Utilizarea de modifiers.
  - https://github.com/EduardDumitrescul/relic-chain/blob/16d4fb56ad34407ec6e7364ecfdef54f8a75ef8c/truffle/contracts/AuctionHouse.sol#L37-L44
  - https://github.com/EduardDumitrescul/relic-chain/blob/16d4fb56ad34407ec6e7364ecfdef54f8a75ef8c/truffle/contracts/AuctionHouse.sol#L71-L76
- Exemple pentru toate tipurile de funcții (external, pure, view etc.).
  -  external payable: https://github.com/EduardDumitrescul/relic-chain/blob/16d4fb56ad34407ec6e7364ecfdef54f8a75ef8c/truffle/contracts/AuctionHouse.sol#L76-L89
  -  external virtual override: https://github.com/EduardDumitrescul/relic-chain/blob/16d4fb56ad34407ec6e7364ecfdef54f8a75ef8c/truffle/contracts/AuctionHouse.sol#L91-L98
  -  internal view: https://github.com/EduardDumitrescul/relic-chain/blob/16d4fb56ad34407ec6e7364ecfdef54f8a75ef8c/truffle/contracts/AuctionHouse.sol#L62-L69
  -  internal pure: https://github.com/EduardDumitrescul/relic-chain/blob/16d4fb56ad34407ec6e7364ecfdef54f8a75ef8c/truffle/contracts/AuctionHouse.sol#L132-L135
- Exemple de transfer de ETH.
  -  ETH + Token: https://github.com/EduardDumitrescul/relic-chain/blob/16d4fb56ad34407ec6e7364ecfdef54f8a75ef8c/truffle/contracts/AuctionHouse.sol#L105-L130
- Ilustrarea interacțiunii dintre smart contracte.
  - AuctionHouse mosteneste Withdrawable si are adresa contractului TokenGenerator: https://github.com/EduardDumitrescul/relic-chain/blob/16d4fb56ad34407ec6e7364ecfdef54f8a75ef8c/truffle/contracts/AuctionHouse.sol#L5-L11
- Deploy pe o rețea locală sau pe o rețea de test Ethereum.
  - Ganache 

### Cerințe opționale (maxim 2 puncte) – se pot alege câteva elemente din lista
- Utilizare librării.
- Implementarea de teste (cu tool-uri la alegerea echipelor).
  - [relicAuction.test.js](truffle/test/relicAuction.test.js)
  - [relicToken.test.js](truffle/test/relicToken.test.js )
  - exemplu: https://github.com/EduardDumitrescul/relic-chain/blob/8aff499fe088424cb322c1e336e11ee11f20921c/truffle/test/relicAuction.test.js#L166-L193
- Utilizarea unor elemente avansate de OOP (interfețe, moștenire) pentru implementarea unor pattern-uri utilizate frecvent (exemple Proxy Pattern, Withdrawal Pattern, Library Pattern etc.).
  - Withdrawal Pattern: https://github.com/EduardDumitrescul/relic-chain/blob/8aff499fe088424cb322c1e336e11ee11f20921c/truffle/contracts/Withdrawable.sol#L4-L20 
- Implementarea de standarde ERC.
  - safeMint, safeTransferFrom, ownerOf
  - https://github.com/EduardDumitrescul/relic-chain/blob/16d4fb56ad34407ec6e7364ecfdef54f8a75ef8c/truffle/contracts/TokenGenerator.sol#L5
- Utilizarea de Oracles.
- Utilizarea altor platforme de stocare descentralizată (exemplu IPFS).
  - IPFS: https://github.com/EduardDumitrescul/relic-chain/blob/16d4fb56ad34407ec6e7364ecfdef54f8a75ef8c/client/src/ipfs/ImageDataSource.js#L3-L20 

## Partea 2: Interacțiunea cu blockchain printr-o aplicație web3

Atât framework-ul de front-end cât și librăriile web3 utilizate sunt la alegerea echipelor.

### Cerințe obligatorii (maxim 1.5 punct) – minim pentru promovare
- Utilizarea unei librării web3 (exemple web3 sau ethersjs) și conectarea cu un Web3 Provider pentru accesarea unor informații generale despre conturi (adresa, balance).
  - web3: https://github.com/EduardDumitrescul/relic-chain/blob/16d4fb56ad34407ec6e7364ecfdef54f8a75ef8c/client/src/contexts/EthContext/EthProvider.jsx#L6-L81
- Inițierea tranzacțiilor de transfer sau de apel de funcții, utilizând clase din librăriile web3.
  - [AuctionHouseInteractor.js](client/src/blockchainInteractors/AuctionHouseInteractor.js)
  - [TokenGeneratorInteractor.js](client/src/blockchainInteractors/TokenGeneratorInteractor.js)
  - exemplu: https://github.com/EduardDumitrescul/relic-chain/blob/16d4fb56ad34407ec6e7364ecfdef54f8a75ef8c/client/src/modules/AuctionService.js#L11-L18

### Cerințe opționale (maxim 2,5 puncte) – se pot alege câteva elemente din lista
- Tratare events (Observer Pattern).
  - https://github.com/EduardDumitrescul/relic-chain/blob/16d4fb56ad34407ec6e7364ecfdef54f8a75ef8c/client/src/modules/relic/addRelic/AddRelic.jsx#L35-L41
  - https://github.com/EduardDumitrescul/relic-chain/blob/16d4fb56ad34407ec6e7364ecfdef54f8a75ef8c/client/src/blockchainInteractors/TokenGeneratorInteractor.js#L102-L110
- Analiza gas-cost (estimare cost și fixare limită de cost).
- Control al stării tranzacțiilor (tratare excepții).
  - https://github.com/EduardDumitrescul/relic-chain/blob/16d4fb56ad34407ec6e7364ecfdef54f8a75ef8c/client/src/blockchainInteractors/handleTransaction.js#L1-L30
  - https://github.com/EduardDumitrescul/relic-chain/blob/16d4fb56ad34407ec6e7364ecfdef54f8a75ef8c/client/src/blockchainInteractors/AuctionHouseInteractor.js#L25-L40
