import {useEffect, useState} from "react";
import { RelicModel } from "../../../models/RelicModel";
import Headline from "../../../components/Text/Headline";
import Body from "../../../components/Text/Body";
import {Button, Box, TextField} from "@mui/material"; // Import MUI components
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {AuctionService} from "../../AuctionService";
import {useEth} from "../../../contexts/EthContext";
import {Auction} from "./Auction";
import RelicService from "../../RelicService";
import {useNavigate, useParams} from "react-router-dom";
import dayjs from "dayjs";

export function ViewRelic() {
    const [model, setModel] = useState(new RelicModel());
    const {id} = useParams();
    const {state} = useEth();
    const auctionService = new AuctionService(state);
    const navigate = useNavigate();

    const [endTime, setEndTime] = useState(dayjs());

    useEffect(() => {
        const relicService = new RelicService(state);
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
    }, [id, state]);

    const handleAddToAuction = async () => {
        const auction = new Auction(
            dayjs().unix(),
            dayjs().unix() + 61,
            model.id
        );
        const success = await auctionService.createAuction(auction);
        if(success === true) {
            navigate(`/auction`);
        }
        else {
            alert("Failure! Auction hasn't been created");
        }
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
                            <DateTimePicker
                                label="Auction End Time"
                                value={endTime}
                                onChange={(newValue) => setEndTime(newValue)}
                                renderInput={(params) => <TextField {...params} fullWidth />}
                                sx={{ mb: 2, width:"100%" }} // Margin bottom for spacing
                            />
                            <p>The end date picker is disabled for testing and demonstration purposes.</p>
                            <p>The auction will be active for 61 seconds.</p>
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
