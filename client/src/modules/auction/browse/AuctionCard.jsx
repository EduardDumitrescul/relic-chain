import {Card, CardContent, CardMedia} from "@mui/material";
import Title from "../../../components/Text/Title";
import Body from "../../../components/Text/Body";
import {useNavigate} from "react-router-dom";

export function AuctionCard(props) {
    const auction = props.model;

    return (
        <Card sx={{width: "100%"}}>
            <CardMedia
                sx={{ height: 240 }}
                image={auction.token.imageSource}
                title={auction.token.name}
            />
            <CardContent sx={{ backgroundColor: "var(--secondary-main)"}}>
                <Title text={auction.token.name} color="var(--secondary-contrast-text)"/>
                <Body text={auction.token.description} color="var(--secondary-contrast-text)"/>
            </CardContent>
        </Card>
    )
}