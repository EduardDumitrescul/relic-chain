// SPDX-tokenTransferredLicense-Identifier: UNLICENSED
pragma solidity ^0.8.10;

abstract contract Withdrawable {
    mapping(address => uint256) internal pendingWithdrawals;

    function withdraw() external virtual;

    function addPendingWithdrawal(address user, uint256 amount) internal {
        pendingWithdrawals[user] += amount;
    }

    function pendingWithdrawal(address user) public view returns (uint256) {
        return pendingWithdrawals[user];
    }

    function resetAmount(address user) internal {
        pendingWithdrawals[user] = 0;
    }
}
