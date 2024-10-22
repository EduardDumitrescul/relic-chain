import {createHelia} from "helia";
import {strings} from "@helia/strings";
import {CID} from "multiformats/cid";

class DataSource {
    #helia = null;
    #stringsService = null;

    constructor() {
        this.#helia = null;
        this.#stringsService = null;
        this.#initialize();
    }

    // Initialize Helia and Strings service
    async #initialize() {
        try {
            this.helia = await createHelia();
            this.stringsService = strings(this.helia);
            console.log('Helia node initialized.');
        } catch (error) {
            console.error('Error initializing Helia:', error);
        }
    }

    // Add string data to IPFS and return the CID
    async addData(data) {
        if (!this.stringsService) {
            throw new Error('Helia node not initialized.');
        }

        try {
            const cid = await this.stringsService.add(data);
            console.log('Data added to Helia with CID:', cid.toString());
            return cid.toString();  // Return CID as string
        } catch (error) {
            console.error('Error adding data to Helia:', error);
            throw error;
        }
    }

    // Retrieve data from IPFS using the CID
    async getData(cidString) {
        let cid = CID.parse(cidString);
        if (!this.stringsService) {
            throw new Error('Helia node not initialized.');
        }

        try {
            const data = await this.stringsService.get(cid);
            console.log('Data retrieved from Helia:', data);
            return data;
        } catch (error) {
            console.error('Error retrieving data from Helia:', error);
            throw error;
        }
    }
}
export default new DataSource();