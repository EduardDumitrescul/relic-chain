import {useTheme} from "@mui/material";
import {Link} from "react-router-dom";
import {useEth} from "../contexts/EthContext";

function NavBar() {
    const theme = useTheme();
    const {state} = useEth();

    const containerStyle = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: theme.palette.primary.main,
    }

    const linksContainerStyle = {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: theme.spacing(8),
        padding: theme.spacing(2),
    }

    const linkStyle = {
        textDecoration: "none",
        color: theme.palette.primary.contrastText,
    }

    const profileInfoContainerStyle = {
        display: "flex",
        flexDirection: "column",
        paddingHorizontal: theme.spacing(4),
        justifyContent: "center",
    }

    return (
        <div style={containerStyle}>
            <div style={linksContainerStyle}>
                <Link to="/" style={linkStyle}>Home</Link>
                <Link to="/" style={linkStyle}>Home</Link>
                <Link to="/" style={linkStyle}>Home</Link>
            </div>

            <div style={profileInfoContainerStyle}>
                <p style={{margin: '0px'}}>Account: {state.accounts[0]}</p>
                <p style={{margin: '0px'}}>Balance: {state.web3.utils.fromWei(state.balance, 'ether')} ETH</p>
            </div>
        </div>

    )
}

export default NavBar;