import {Typography, useTheme} from "@mui/material";

export function Headline(props) {
    const theme = useTheme();

    const textColor = props.color? props.color : theme.palette.primary.contrastText;

    return (
        <Typography variant="h2" color={textColor}>{props.text}</Typography>
    )
}

export default Headline;