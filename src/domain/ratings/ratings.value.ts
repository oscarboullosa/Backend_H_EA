import { RatingsEntity } from "./ratings.entity";

export class RatingValue implements RatingsEntity{
    uuid: string;
    ratingType: "user" | "activity" | "location" | "comment" | "publication";
    idRatedObject: string;
    ratingAverage: number;
    idRaters?:[string];

    constructor({uuid,ratingType,idRatedObject,ratingAverage,idRaters}:
        {uuid:string,ratingType:"user" | "activity" | "location" | "comment" | "publication",idRatedObject:string,ratingAverage:number,idRaters?:[string]}){
        this.uuid=uuid;
        this.ratingType=ratingType;
        this.idRatedObject=idRatedObject;
        this.ratingAverage=ratingAverage;
        this.idRaters=idRaters;
    }
}
