import {Card, CardContent, CardMedia} from "@mui/material";
import Title from "../../../components/Text/Title";
import Body from "../../../components/Text/Body";
import {useNavigate} from "react-router-dom";
import RelicCardModel from "./RelicCardModel";

function RelicCard(props) {
    const model = props.model;

    const navigate = useNavigate(); // Initialize useNavigate

    const handleClick = () => {
        navigate(`relic/${model.id}`); // Change the path as needed
    };

    return (
        <Card sx={{width: "100%"}} onClick={handleClick}>
            <CardMedia
                sx={{ height: 240 }}
                image={model.imageUrl}
                title={model.name}
            />
            <CardContent sx={{ backgroundColor: "var(--secondary-main)"}}>
                <Title text={model.name} color="var(--secondary-contrast-text)"/>
                <Body text={model.description} color="var(--secondary-contrast-text)"/>
            </CardContent>
        </Card>
    )
}

export default RelicCard;