import { createHelia } from 'helia';
import { strings } from '@helia/strings';
import { CID } from 'multiformats/cid';
import JsonDataSource from "../storage/JsonDataSource";
import jsonDataSource from "../storage/JsonDataSource";

class InventoryService {
    constructor() {
        this.jsonDataSource = JsonDataSource
    }

    async test() {
        let string  = '{sgdfgdgdfg : 123}';
        let json = JSON.stringify(string);
        console.log(json);
        let cid = await jsonDataSource.storeJson(json);
        console.log(await jsonDataSource.retrieveJson(cid))
    }
}

export default new InventoryService();
