import {Box, Grid2} from "@mui/material";
import Headline from "../../../components/Text/Headline";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {AuctionService} from "../../AuctionService";
import {useEth} from "../../../contexts/EthContext";
import {AuctionCard} from "./AuctionCard";

export function BrowseAuctions() {
    let [auctions, setAuctions] = useState([]);
    let {state} = useEth();
    const auctionService = new AuctionService(state);

    useEffect(() => {
        async function fetchAuctions() {
            try {
                let models = await auctionService.getAuctions();
                setAuctions(models);
            }
            catch (err) {
                console.log("Error while trying to fetch Auction Models");
                setAuctions([]);
            }
        }
        fetchAuctions()
    }, []);

    return (
        <>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Headline text="Auctions" />
            </Box>
            <Grid2 container spacing={{ xs: 2, md: 3 }} columns={ 12}>
                {auctions.map((model, index) => (
                    <Grid2 size = {12} key={index}>
                        <AuctionCard model={model} />
                    </Grid2>
                ))}
            </Grid2>
        </>
    )
}