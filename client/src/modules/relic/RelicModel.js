export class RelicModel {
    id = 0;
    name = "Name";
    description = "Description";
    imageSource = "/images/relic-card-default.jpg";

    constructor(
        id = 0,
        name = "Name",
        description = "Description",
        imageSource = "/images/relic-card-default.jpg"
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.imageSource = imageSource;
    }
}