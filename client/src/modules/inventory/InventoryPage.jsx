import styles from './MyRelics.module.css';
import {Grid, Grid2, useTheme} from "@mui/material";
import Title from "../../components/Text/Title";
import RelicCardModel from "./RelicCard/RelicCardModel";
import Headline from "../../components/Text/Headline";
import RelicCard from "./RelicCard/RelicCard";
import InventoryService from "./InventoryService";
import {useEffect, useState} from "react";
import TokenRetriever from "./TokenRetriever";
import {useEth} from "../../contexts/EthContext";

function InventoryPage() {
    const {state} = useEth();
    const inventoryService = new InventoryService(state);
    const [cardModels, setCardModels] = useState([]);

    useEffect(() => {
        async function fetchCardModels() {
            try {
                let models = await inventoryService.getRelics();
                console.log(await (new TokenRetriever(state)).getTokenURIs());
                setCardModels(models);
            }
            catch (err) {
                console.log("Error while trying to fetch Card Models");
                setCardModels([]);
            }
        }
        fetchCardModels()
    }, []);

    console.log('InventoryPage rendered');
    return (
        <>
            <Headline text="Your Relics" />
            <Grid2 container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {cardModels.map((model, index) => (
                    <Grid2 size = {4} key={index}>
                        <RelicCard model={model} />
                    </Grid2>
                ))}
            </Grid2>
        </>
    )
}

export default InventoryPage;
