import {Typography, useTheme} from "@mui/material";

function Title(props) {
    const theme = useTheme();

    const textColor = theme.palette.primary.contrastText;

    return (
        <Typography variant="h2" color={textColor}>{props.text}</Typography>
    )
}

export default Title;