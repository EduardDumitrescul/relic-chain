import { Box, Button, TextField } from "@mui/material";
import Title from "../../components/Text/Title";
import {useEffect, useState} from "react";
import RelicService from "./RelicService";
import RelicModel from "./RelicModel";
import {useEth} from "../../contexts/EthContext";

function EditRelic() {
    const { state } = useEth();
    const relicService = new RelicService(state);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);

    useEffect(() => {
        console.log("eth value in EditRelic:", state);
    }, [state]);

    // const handleImageChange = (event) => {
    //     const file = event.target.files[0];
    //     if (file) {
    //         setImage("image"); // Preview image
    //     }
    // };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (relicService) { // Check if relicService is not null
            const model = new RelicModel(name, description, image.toString());
            console.log("EditRelic.handleSubmit()\n" + model);
            relicService.addRelic(model);
        } else {
            console.error("RelicService is not initialized");
        }
    };

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
            {/*<Button variant="contained" component="label">*/}
            {/*    Upload Image*/}
            {/*    <input type="file" hidden accept="image/*" onChange={handleImageChange} />*/}
            {/*</Button>*/}
            {/*{image && <img src={image} alt="Preview" style={{ width: '100%', marginTop: '10px' }} />}*/}
            <Button type="submit" variant="contained" color="primary">
                Submit
            </Button>
        </Box>
    );
}

export default EditRelic;
