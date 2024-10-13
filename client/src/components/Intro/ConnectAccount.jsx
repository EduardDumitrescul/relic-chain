    import useEth from "../../contexts/EthContext/useEth";
    import {useTheme} from "@mui/material";

    function ConnectAccount() {
        const {state} = useEth();
        const theme = useTheme();

        const containerStyle = {
            display: "flex",
            justifyContent: "center", // Center horizontally
            alignItems: "center", // Center vertically
            width: "40%",
            height: "40%",
            background: theme.palette.primary.main,
            color: theme.palette.primary.contrastText, // Add contrast for the text inside
            borderRadius: "10px", // Optional: round the corners
        };

        const pageStyle = {
            display: "flex",
            justifyContent: "center", // Center horizontally
            alignItems: "center", // Center vertically
            height: "100vh", // Full viewport height to center vertically
            width: "100vw",
            background: theme.palette.primary.light, // Optional: background for the page
        };

        return (
            <div id="ConnectAccount" style={pageStyle}>
                <div className="container" style={containerStyle}>
                    {state.accounts && state.accounts.length > 0 ? (
                        <p>Connected Account: {state.accounts[0]}</p>
                    ) : (
                        <p>Please Connect Account</p>
                    )}
                </div>
            </div>
        );
    }

    export default ConnectAccount;