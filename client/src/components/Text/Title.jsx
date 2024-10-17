import {Typography, useTheme} from "@mui/material";

function Title(props) {
    const theme = useTheme();

    const textColor = props.color? props.color : theme.palette.primary.contrastText;

    return (
        <Typography variant="h4" color={textColor}>{props.text}</Typography>
    )
}

export default Title;