import styles from './MyRelics.module.css';
import {Grid, Grid2, useTheme} from "@mui/material";
import Title from "../Title";
import RelicCardModel from "./RelicCardModel";
import Headline from "../Headline";
import RelicCard from "./RelicCard";

function MyRelics() {
    const relicCardModels = [
        new RelicCardModel(),
        new RelicCardModel(),
        new RelicCardModel(),
        new RelicCardModel(),
        new RelicCardModel(),
        new RelicCardModel(),
        new RelicCardModel(),
    ]

    return (
        <>
            <Headline text="Your Relics" />
            <Grid2 container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {relicCardModels.map((model, index) => (
                    <Grid2 size = {4} item key={index}>
                        <RelicCard model={model} />
                    </Grid2>
                ))}
            </Grid2>
        </>
    )
}

export default MyRelics;
