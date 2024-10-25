import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box, TextField, Button, Card, CardMedia, CardContent, CardActions } from '@mui/material';
import {useEth} from "../../../contexts/EthContext";
import {AuctionService} from "../../AuctionService";

export function ViewAuction() {
    const { id } = useParams();
    const {state} = useEth();
    const auctionService = new AuctionService(state);
    const [auction, setAuction] = useState(null);
    const [bidAmount, setBidAmount] = useState('');

    useEffect(() => {
        async function fetchAuction() {
            try {
                const auction = await auctionService.getAuction(id);
                setAuction(auction);
            }
            catch (err) {
                console.log("Error while trying to fetch auction");
            }
        }
        fetchAuction();
    }, [id]);

    const currentAccountIsOwner = () => {
        return auction.tokenOwner === state.accounts[0]
    }
    const auctionInProgress = () => {
        console.log(auction.beginTimestamp + "   " + Date.now() / 1000);
        return auction.beginTimestamp < Date.now() / 1000 && Date.now() / 1000 < auction.endTimestamp;
    }

    const handleBidSubmit = async (e) => {
        e.preventDefault();

        if(bidAmount*1e18 < auction.bidAmount) {
            alert("Please place a higher bid");
            return;
        }

        await auctionService.placeBid(auction.id, bidAmount);
    };

    if (!auction) return <Typography>Loading auction details...</Typography>;

    return (
        <Box display="flex" justifyContent="center" mt={5}>
            <Card sx={{ maxWidth: 400, backgroundColor: "transparent", boxShadow: "none" }}>
                <CardMedia
                    component="img"
                    height="200"
                    image={auction.tokenImageSource}
                    alt={auction.tokenName}
                />
                <CardContent>
                    <Typography variant="h5" component="div">
                        {auction.tokenName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        {auction.tokenDescription}
                    </Typography>
                    <Typography variant="h6">
                        Current Bid: {auction.bidAmount / 1e18}ETH
                    </Typography>
                    <Typography color="text.secondary">
                        Auction Starts: {new Date(auction.beginTimestamp * 1000).toLocaleString()}
                    </Typography>
                    <Typography color="text.secondary">
                        Auction Ends: {new Date(auction.endTimestamp * 1000).toLocaleString()}
                    </Typography>
                </CardContent>
                {currentAccountIsOwner() === false && auctionInProgress() &&
                    <CardActions>
                        <Box component="form" onSubmit={handleBidSubmit} display="flex" flexDirection="column" width="100%" px={2}>
                            <TextField
                                label="Place your bid"
                                type="number"
                                value={bidAmount}
                                onChange={(e) => setBidAmount(e.target.value)}
                                fullWidth
                                margin="normal"
                            />
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Submit Bid
                            </Button>
                        </Box>
                    </CardActions>
                }

            </Card>
        </Box>
    );
}
