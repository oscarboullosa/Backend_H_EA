export interface RatingsEntity{
    uuid: string;
    ratingType: "user" | "activity" | "location" | "comment" | "publication";
    idRatedObject: string;
    ratingAverage: number;
    idRaters?:[string];
}