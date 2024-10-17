import {Card, CardContent, CardMedia} from "@mui/material";
import RelicCardModel from "./RelicCardModel";
import Title from "../Title";
import Body from "../Body";

function RelicCard(props) {
    const model = props.model;
    return (
        <Card sx={{minWidth: "300px"}}>
            <CardMedia
                sx={{ height: 240 }}
                image={model.imageUrl}
                title={model.name}
            />
            <CardContent sx={{ backgroundColor: "var(--secondary-main)"}}>
                <Title text={model.name} color="var(--secondary-contrast-text)"/>
                <Body text={model.descriprion} color="var(--secondary-contrast-text)"/>
            </CardContent>
        </Card>
    )
}

export default RelicCard;