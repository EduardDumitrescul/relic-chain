import {Box, Grid2} from "@mui/material";
import Headline from "../../components/Text/Headline";
import RelicCard from "./RelicCard/RelicCard";
import InventoryService from "./InventoryService";
import {useEffect, useState} from "react";
import TokenRetriever from "./TokenRetriever";
import {useEth} from "../../contexts/EthContext";
import {Link, useNavigate} from 'react-router-dom';

function InventoryPage() {
    const {state} = useEth();
    const navigate = useNavigate();
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

    const handleAddRelicClick = () => {
        navigate("/relic/0");
    }

    console.log('InventoryPage rendered');
    return (
        <>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Headline text="Your Relics" />
                <Link to="/relic/0" className="btn btn-primary">New Relic</Link>
            </Box>
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
