import {Card, CardContent, CardMedia} from "@mui/material";
import Title from "../../../components/Text/Title";
import Body from "../../../components/Text/Body";

function RelicCard(props) {
    const model = props.model;
    return (
        <Card sx={{width: "100%"}}>
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