import { PublicationEntity } from "./publication.entity";


export interface PublicationRepository{
    insertPublication(data:PublicationEntity):Promise<PublicationEntity|null>;
    listPublication():Promise<PublicationEntity[]|null>;
    getNumPublications():Promise<String|null>;
    getPublicationById(uuid:string):Promise<PublicationEntity|null>;
    updatePublication(uuid:string,data:PublicationEntity):Promise<PublicationEntity|null>;
    deletePublication(uuid:string):Promise<PublicationEntity|null>;
    listPublicationsPag(numPage:string):Promise<PublicationEntity[]|null>;
    updateLikes(uuid:string,uuidUser:string):Promise<PublicationEntity|null>;
}