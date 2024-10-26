import { create } from 'ipfs-http-client';

const client = create({
    host: 'localhost',
    port: 5001,
    protocol: 'http'
});

export const imageDataSource = {
    async uploadImage(image) {
        try {
            const added = await client.add(image);
            const url = `https://ipfs.io/ipfs/${added.path}`; // Updated to use IPFS.io gateway
            return url;
        } catch (error) {
            console.error("Error uploading image: ", error);
            return null;
        }
    },
}