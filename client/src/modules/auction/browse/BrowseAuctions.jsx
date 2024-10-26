import { Box, Grid2, Button } from "@mui/material";
import Headline from "../../../components/Text/Headline";
import { useEffect, useState } from "react";
import { AuctionService } from "../../AuctionService";
import { useEth } from "../../../contexts/EthContext";
import { AuctionCard } from "./AuctionCard";
import Body from "../../../components/Text/Body";

export function BrowseAuctions() {
    let [auctions, setAuctions] = useState([]);
    let [withdrawAmount, setWithdrawAmount] = useState(0);
    let { state } = useEth();

    useEffect(() => {
        const auctionService = new AuctionService(state);

        async function fetchAuctions() {
            try {
                let models = await auctionService.getPendingAuctions();
                setAuctions(models);
            } catch (err) {
                console.log("Error while trying to fetch Auction Models");
                setAuctions([]);
            }
        }

        async function fetchWithdrawAmount() {
            const amount = await auctionService.getPendingWithdrawAmount();
            console.log(amount);
            setWithdrawAmount(amount);
        }

        if (state.auctionHouseAddress) {
            fetchAuctions();
            fetchWithdrawAmount();
        }
    }, [state]);

    const handleWithdraw = async () => {
        const auctionService = new AuctionService(state);
        try {
            await auctionService.withdrawPendingAmount(); // Call the service to withdraw
            setWithdrawAmount(0); // Reset withdraw amount after successful withdrawal
            window.location.reload();
        } catch (error) {
            console.error("Error during withdrawal:", error);
            alert("Withdrawal failed!");
        }
    };

    return (
        <>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Headline text="Auctions" />
                {withdrawAmount > 0 && (
                    <>
                        <Body text={`Pending Amount: ${withdrawAmount / 1e18} ETH`} />
                        <Button variant="contained" color="primary" onClick={handleWithdraw}>
                            Withdraw
                        </Button>
                    </>
                )}
            </Box>
            <Grid2 container spacing={{ xs: 2, md: 3 }} columns={12}>
                {auctions.map((model, index) => (
                    <Grid2 size={12} key={index}>
                        <AuctionCard model={model} />
                    </Grid2>
                ))}
            </Grid2>
        </>
    );
}
