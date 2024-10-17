// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

contract RelicToken {
    uint256 public tokenCount = 0;

    constructor(){

    }

    function createToken(address _owner) public {
        tokenCount ++;
    }
}
