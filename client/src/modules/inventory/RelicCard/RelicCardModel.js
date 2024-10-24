class RelicCard {
    name;
    description;
    imageUrl;
    id;

    constructor(
        id,
        name = "Test",
        description = "Just a show description",
        imageUrl = "/images/relic-card-default.jpg"
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
    }
}

export default RelicCard;