import DataSource from "./DataSource";

class JsonDataSource {
    #dataSource = null;

    constructor() {
        this.#dataSource = DataSource
    }

    async storeJson(json) {
        let jsonString = JSON.stringify(json);
        return this.#dataSource.addData(jsonString)
    }

    async retrieveJson(cidString) {
        let jsonString = await this.#dataSource.getData(cidString)
        return JSON.parse(jsonString);
    }
}

export default new JsonDataSource();