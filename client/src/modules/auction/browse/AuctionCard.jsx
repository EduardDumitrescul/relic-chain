import {Card, CardContent, CardMedia} from "@mui/material";
import Title from "../../../components/Text/Title";
import Body from "../../../components/Text/Body";
import {useNavigate} from "react-router-dom";

export function AuctionCard(props) {
    const auction = props.model;
    const navigate = useNavigate();

    const handleOnClick = () => {
        navigate(`/auction/${auction.id}`);
    }

    return (
        <Card sx={{width: "100%"}} onClick={handleOnClick}>
            <CardMedia
                sx={{ height: 240 }}
                image={auction.tokenImageSource}
                title={auction.tokenName}
            />
            <CardContent sx={{ backgroundColor: "var(--secondary-main)"}}>
                <Title text={auction.tokenName} color="var(--secondary-contrast-text)"/>
                <Body text={auction.tokenDescription} color="var(--secondary-contrast-text)"/>
            </CardContent>
        </Card>
    )
}