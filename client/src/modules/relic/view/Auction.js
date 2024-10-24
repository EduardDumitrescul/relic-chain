export class Auction {
    startTimeInSeconds = 0;
    endTimeInSeconds = 0;
    tokenId = 0;

    constructor(
        startTimeInSeconds,
        endTimeInSeconds,
        tokenId,
    ) {
        this.endTimeInSeconds = endTimeInSeconds;
        this.startTimeInSeconds = startTimeInSeconds;
        this.tokenId = tokenId;
    }

    duration() {
        return this.endTimeInSeconds - this.startTimeInSeconds;
    }
}