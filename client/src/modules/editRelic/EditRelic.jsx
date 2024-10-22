import {useParams} from "react-router-dom";
import {Box, Button, TextField} from "@mui/material";
import Title from "../../components/Text/Title";
import {useState} from "react";
import Headline from "../../components/Text/Headline";

function EditRelic() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file)); // Preview image
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission (e.g., sending data to the server)
        console.log('Name:', name);
        console.log('Description:', description);
        console.log('Image:', image);
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', margin: '0 auto'}}
        >
            <Title text ="Add New Relic"/>
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
            <Button variant="contained" component="label">
                Upload Image
                <input type="file" hidden accept="image/*" onChange={handleImageChange} />
            </Button>
            {image && <img src={image} alt="Preview" style={{ width: '100%', marginTop: '10px' }} />}
            <Button type="submit" variant="contained" color="primary">
                Submit
            </Button>
        </Box>
    );
}

export default EditRelic;