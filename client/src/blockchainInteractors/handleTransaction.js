export async function handleTransaction(web3, transactionPromise) {
    try {
        // Initiate the transaction
        const transaction = await transactionPromise;
        const transactionHash = transaction.transactionHash;
        console.log("Transaction initiated with hash:", transactionHash);

        // Track the state of the transaction until confirmed or failed
        let receipt = null;
        while (!receipt) {
            receipt = await web3.eth.getTransactionReceipt(transactionHash);
            if (!receipt) {
                console.log("Transaction is pending...");
                await new Promise((resolve) => setTimeout(resolve, 1000)); // Polling delay
            }
        }

        // Confirm transaction status
        if (receipt.status) {
            console.log("Transaction confirmed:", receipt);
            return true;
        } else {
            console.error("Transaction failed:", receipt);
            return false;
        }
    } catch (error) {
        console.error("Error during transaction:", error);
        return false;
    }
}