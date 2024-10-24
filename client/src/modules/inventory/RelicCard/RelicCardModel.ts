class RelicCard {
    public readonly name: string;
    public readonly description: string;
    public readonly imageUrl: string;
    public readonly id: number;

    constructor(
        id: number,
        name: string = "Test",
        description: string = "Just a show description",
        imageUrl = "/images/relic-card-default.jpg"
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
    }
}

export default RelicCard;