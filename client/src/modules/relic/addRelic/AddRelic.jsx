import { Box, Button, TextField } from "@mui/material";
import Title from "../../../components/Text/Title";
import {useEffect, useState} from "react";
import RelicService from "../../RelicService";
import {RelicModel} from "../../../models/RelicModel";
import {useEth} from "../../../contexts/EthContext";
import {useNavigate} from "react-router-dom";

function AddRelic() {
    const { state } = useEth();
    const relicService = new RelicService(state);
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
            const model = new RelicModel(0, name, description);
        relicService.addRelic(model);
    };

    useEffect(() => {
        relicService.listenForTokenCreated((event) => {
            if(event.owner === state.accounts[0]) {
                navigate("/");
            }
        })
    }, [navigate, relicService, state.accounts]);

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', margin: '0 auto' }}
        >
            <Title text="Add New Relic" />
            <TextField
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <TextField
                label="Description"
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                multiline
                rows={4}
            />
            <Button type="submit" variant="contained" color="primary">
                Submit
            </Button>
        </Box>
    );
}

export default AddRelic;
