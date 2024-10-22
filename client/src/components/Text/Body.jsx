import {Typography, useTheme} from "@mui/material";

function Body(props) {
    const theme = useTheme();

    const textColor = props.color? props.color : theme.palette.primary.contrastText;

    return (
        <Typography variant="h6" color={textColor}>{props.text}</Typography>
    )
}

export default Body;