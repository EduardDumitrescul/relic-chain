import { createHelia } from 'helia';
import { strings } from '@helia/strings';
import { CID } from 'multiformats/cid';
import JsonDataSource from "../storage/JsonDataSource";
import jsonDataSource from "../storage/JsonDataSource";
import RelicCardModel from "./RelicCard/RelicCardModel";

class InventoryService {
    #jsonDataSource = null;

    constructor() {
        this.#jsonDataSource = JsonDataSource
    }

    async #putTestData() {
        const relicCardModels = [
            new RelicCardModel(),
            new RelicCardModel(),
            new RelicCardModel(),
            new RelicCardModel(),
            new RelicCardModel(),
            new RelicCardModel(),
            new RelicCardModel(),
        ]

        const jsons = relicCardModels.map((model) => {return JSON.stringify(model)})
        let cids = []

        for(let json of jsons) {
            cids.push(await jsonDataSource.storeJson(json));
        }
        return cids;
    }

    async getRelics() {
        let cids = await this.#putTestData()
        let models = []
        for(let cid of cids) {
            models.push(await this.getRelic(cid));
        }
        return models;
    }

    async getRelic(cid) {
        let json = await jsonDataSource.retrieveJson(cid);
        let model = JSON.parse(json);
        return model;
    }
}

export default new InventoryService();
