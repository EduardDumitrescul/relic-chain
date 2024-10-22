import {CID} from "multiformats/cid";
import DataSource from "./DataSource";

class JsonDataSource {
    constructor() {
        this.dataSource = DataSource
    }

    async storeJson(json) {
        let jsonString = JSON.stringify(json);
        return this.dataSource.addData(jsonString)
    }

    async retrieveJson(cidString) {
        let jsonString = await this.dataSource.getData(cidString)
        let json = JSON.parse(jsonString);
        return json;
    }
}

export default new JsonDataSource();