import useEth from "../../contexts/EthContext/useEth";

function ConnectAccount() {
    const {state} = useEth();

    return (
        <div>
            {state.accounts && state.accounts.length > 0 ? (
                // If accounts are present, show the connected account
                <p>Connected Account: {state.accounts[0]}</p>
            ) : (
                // If no accounts are connected, prompt the user
                <p>Please Connect Account</p>
            )}
        </div>
    )
}

export default ConnectAccount;