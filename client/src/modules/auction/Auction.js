import {RelicModel} from "../RelicModel";

export class Auction {
    constructor(
        id = 0,
        startTime = 0,
        duration = 0,
        token = new RelicModel(),
        bidder = 0,
        bidAmount = 0,
    ) {
        this.id = id;
        this.startTime = startTime;
        this.duration = duration;
        this.token = token;
        this.bidder = bidder;
        this.bidAmount = bidAmount;
    }
}