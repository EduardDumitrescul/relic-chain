import { Box, Button, TextField } from "@mui/material";
import Title from "../../../components/Text/Title";
import { useEffect, useRef, useState } from "react";
import RelicService from "../../RelicService";
import { RelicModel } from "../../../models/RelicModel";
import { useEth } from "../../../contexts/EthContext";
import { useNavigate } from "react-router-dom";

function AddRelic() {
    const { state } = useEth();
    const relicService = useRef(new RelicService(state));
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setImage(selectedFile);
        // Create an object URL to preview the image
        if (selectedFile) {
            const url = URL.createObjectURL(selectedFile);
            setImageUrl(url);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const model = new RelicModel(0, name, description, false);
        await relicService.current.addRelic(model, image);
    };

    useEffect(() => {
        relicService.current.listenForTokenCreated((event) => {
            if (event.owner === state.accounts[0]) {
                navigate("/");
            }
        });
    }, [navigate, state.accounts]);

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
            {imageUrl && (
                <img src={imageUrl} alt="Preview" style={{ maxWidth: '100%', height: 'auto', marginBottom: '10px' }} />
            )}
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <Button type="submit" variant="contained" color="primary">
                Submit
            </Button>
        </Box>
    );
}

export default AddRelic;
