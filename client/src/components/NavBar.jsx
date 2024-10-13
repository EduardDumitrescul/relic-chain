import {useTheme} from "@mui/material";
import {Link} from "react-router-dom";

function NavBar() {
    const theme = useTheme();

    const containerStyle = {
        display: "flex",
        flexDirection: "row",
        gap: theme.spacing(8),
        padding: theme.spacing(4),
        backgroundColor: theme.palette.primary.main,
    }

    const linkStyle = {
        textDecoration: "none",
        color: theme.palette.primary.contrastText,
    }

    return (
        <div style={containerStyle}>
            <Link to="/" style={linkStyle}>Home</Link>
        </div>
    )
}

export default NavBar;