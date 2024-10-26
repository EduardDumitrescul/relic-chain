import {Box, Grid2} from "@mui/material";
import Headline from "../../../components/Text/Headline";
import RelicCard from "./RelicCard";
import {useEffect, useState} from "react";
import {useEth} from "../../../contexts/EthContext";
import {Link} from 'react-router-dom';
import RelicService from "../../RelicService";

function InventoryPage() {
    const {state} = useEth();
    const [relics, setRelics] = useState([]);

    useEffect(() => {
        const relicService = new RelicService(state);
        async function fetchRelics() {
            try {
                let models = await relicService.getRelicModels();
                setRelics(models);
            }
            catch (err) {
                console.log("Error while trying to fetch Card Models");
                setRelics([]);
            }
        }
        fetchRelics()
    }, [state]);

    return (
        <>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Headline text="Your Relics" />
                <Link to="/relic/0" className="btn btn-primary">New Relic</Link>
            </Box>
            <Grid2 container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {relics.map((model, index) => (
                    <Grid2 size = {4} key={index}>
                        <RelicCard model={model} />
                    </Grid2>
                ))}
            </Grid2>
        </>
    )
}

export default InventoryPage;
