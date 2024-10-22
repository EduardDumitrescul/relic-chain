import {Typography, useTheme} from "@mui/material";

function ConnectAccount() {
    const theme = useTheme();

    const rowStyle = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center", // Center horizontally
        alignItems: "center", // Center vertically
        maxWidth: "60%",
        // height: "40%",
        background: theme.palette.primary.main,
        color: theme.palette.primary.contrastText, // Add contrast for the text inside
        borderRadius: "32px", // Optional: round the corners
        padding: theme.spacing(4),
    };

    const columnStyle = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        gap: theme.spacing(4),
    }

    const pageStyle = {
        display: "flex",
        justifyContent: "center", // Center horizontally
        alignItems: "center", // Center vertically
        height: "100vh", // Full viewport height to center vertically
        width: "100vw",
        background: theme.palette.primary.light, // Optional: background for the page
    };

    const imageStyle ={
        height: "20vh",
        aspectRatio: 1,
    }

    return (
        <div id="ConnectAccount" style={pageStyle}>
            <div className="row" style={rowStyle}>
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"
                    alt="MetaMask logo"
                    style={imageStyle}
                />
                <div className="column" style={columnStyle}>
                    <Typography variant="h1"> No Account Detected </Typography>
                    <Typography variant="h3" sx={{overflow: 'wrap'}}>
                        Please open your MetaMask extension and connect to your wallet
                    </Typography>
                </div>
            </div>
        </div>
    );
}

export default ConnectAccount;