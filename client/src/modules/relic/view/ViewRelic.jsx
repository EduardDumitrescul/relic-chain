import {useEffect, useState} from "react";
import { RelicModel } from "../../RelicModel";
import Headline from "../../../components/Text/Headline";
import Body from "../../../components/Text/Body";
import {Button, Box, TextField} from "@mui/material"; // Import MUI components
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {AuctionService} from "../../AuctionService";
import {useEth} from "../../../contexts/EthContext";
import {Auction} from "./Auction";
import RelicService from "../../RelicService";
import {useParams} from "react-router-dom";
import dayjs from "dayjs";

export function ViewRelic() {
    const [model, setModel] = useState(new RelicModel());
    const {id} = useParams();
    const {state} = useEth();
    const auctionService = new AuctionService(state);
    const relicService = new RelicService(state);

    // State to hold the auction start and end times
    // const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(dayjs());

    useEffect(() => {
        async function fetchRelicModel() {
            try {
                let relic = await relicService.getRelic(id)
                setModel(relic);
            }
            catch (err) {
                console.log("Error while trying to fetch Relic");
                setModel(new RelicModel());
            }
        }
        fetchRelicModel();
    }, []);

    // Function to handle adding the relic to auction
    const handleAddToAuction = async () => {
        // TODO
        // if (!startTime || !endTime) {
        //     alert("Please select both start and end times.");
        //     return;
        // }

        const auction = new Auction(
            dayjs().unix(),
            dayjs().unix() + 61,
            model.id
        );
        await auctionService.createAuction(auction);

    };

    return (
        <>
            <img
                src={model.imageSource}
                alt={"relic"}
                style={{ width: "100%" }}
            />
            <Headline text={model.name} />
            <Body text={model.description} />

            {/* Auction Time Selectors with MUI DateTimePicker */}
            { model.isAuctioned === false &&
                <>
                    <Box component="form" sx={{ mt: 2, width: "100%" }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de"
                                              sx={{width:"100%"}}>
                            {/*<DateTimePicker*/}
                            {/*    label="Auction Start Time"*/}
                            {/*    value={startTime}*/}
                            {/*    onChange={(newValue) => setStartTime(newValue)}*/}
                            {/*    renderInput={(params) => <TextField {...params} fullWidth />}*/}
                            {/*    sx={{ mb: 2, width:"100%" }} // Margin bottom for spacing*/}
                            {/*/>*/}
                            <DateTimePicker
                                label="Auction End Time"
                                value={endTime}
                                onChange={(newValue) => setEndTime(newValue)}
                                renderInput={(params) => <TextField {...params} fullWidth />}
                                sx={{ mb: 2, width:"100%" }} // Margin bottom for spacing
                            />
                        </LocalizationProvider>
                    </Box>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddToAuction}
                        sx={{ mt: 2 }}
                    >
                        Add to Auction
                    </Button>
                </>

            }

        </>
    );
}
