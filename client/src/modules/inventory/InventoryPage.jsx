import styles from './MyRelics.module.css';
import {Grid, Grid2, useTheme} from "@mui/material";
import Title from "../../components/Text/Title";
import RelicCardModel from "./RelicCard/RelicCardModel";
import Headline from "../../components/Text/Headline";
import RelicCard from "./RelicCard/RelicCard";
import InventoryService from "./InventoryService";
import {useEffect, useState} from "react";

function InventoryPage() {
    const [cardModels, setCardModels] = useState([]);

    useEffect(() => {
        async function fetchCardModels() {
            try {
                let models = await InventoryService.getRelics();
                setCardModels(models);
            }
            catch (err) {
                console.log("Error while trying to fetch Card Models");
                setCardModels([]);
            }
        }
        fetchCardModels()
    }, []);

    return (
        <>
            <Headline text="Your Relics" />
            <Grid2 container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {cardModels.map((model, index) => (
                    <Grid2 size = {4} item key={index}>
                        <RelicCard model={model} />
                    </Grid2>
                ))}
            </Grid2>
        </>
    )
}

export default InventoryPage;
