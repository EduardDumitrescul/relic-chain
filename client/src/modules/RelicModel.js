export class RelicModel {
    id = 0;
    name = "Name";
    description = "Description";
    imageSource = "/images/relic-card-default.jpg";
    isAuctioned = false;

    constructor(
        id = 0,
        name = "Name",
        description = "Description",
        isAuctioned = false,
        imageSource = "/images/relic-card-default.jpg",
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.imageSource = imageSource;
        this.isAuctioned = isAuctioned;
    }
}