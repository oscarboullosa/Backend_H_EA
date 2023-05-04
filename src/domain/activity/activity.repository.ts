import { UserEntity } from "../user/user.entity";
import { ActivityEntity } from "./activity.entity";

export interface ActivityRepository{
    insertActivity(data:ActivityEntity):Promise<ActivityEntity|null>;
    updateActivity(uuid:string,data:ActivityEntity):Promise<ActivityEntity|null>;
    deleteActivity(uuid:string):Promise<ActivityEntity|null>;
    listActivity():Promise<ActivityEntity[]|null>;
    getActivityById(uuid:string):Promise<ActivityEntity|null>;
    listActivityPag(numPage:string):Promise<ActivityEntity[]|null>;
    getParticipantsOfActivity(uuid:string,numPage):Promise<UserEntity[]|null>;
    getNumActivity():Promise<String|null>
}
