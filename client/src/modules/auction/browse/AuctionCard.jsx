import {Button, Card, CardActions, CardContent, CardMedia} from "@mui/material";
import Title from "../../../components/Text/Title";
import Body from "../../../components/Text/Body";
import {useNavigate} from "react-router-dom";
import {AuctionService} from "../../AuctionService";
import {useEth} from "../../../contexts/EthContext";
import dayjs from "dayjs";

export function AuctionCard(props) {
    const {state} = useEth();
    const auction = props.model;
    const navigate = useNavigate();
    const auctionService = new AuctionService(state);

    const handleOnClick = () => {
        navigate(`/auction/${auction.id}`);
    }

    const handleFinalize = () => {
        auctionService.finalize(auction.id);
    }

    const showFinalizeButton = () => {
        console.log(auction.owner);
        console.log(state.accounts[0]);
        return auction.endTimestamp < dayjs().unix() && auction.tokenOwner === state.accounts[0];
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
            { showFinalizeButton() &&
                <CardActions>
                    <Button onClick={handleFinalize} sx={{backgroundColor:"transparent"}}>Complete Auction</Button>
                </CardActions>
            }
        </Card>
    )
}