import { AuthEntity, UserEntity,UserAuthEntity } from "./user.entity";

export interface UserRepository{
    getUserById(uuid:string):Promise<UserEntity|null>;
    listUser():Promise<UserEntity[]|null>;
    updateUser(uuid:String,data:UserEntity):Promise<UserEntity|null>;
    registerUser(data:UserAuthEntity):Promise<UserAuthEntity|null>;
    loginUser(data:AuthEntity):Promise<String[2]|null>;
    deleteUser(uuid:string):Promise<UserEntity|null>;
    listUserPag(numPage:string):Promise<UserEntity[]|null>;
    getNumUsers():Promise<String|null>;

    listFollowersPag(uuid:string,numPage:string):Promise<UserEntity[]|null>;
    listFollowedPag(uuid:string,numPage:string):Promise<UserEntity[]|null>;
    insertFollower(uuid:string,uuidFollower:string):Promise<UserEntity[]|null>;
    insertFollowed(uuid:string,uuidFollowed:string):Promise<UserEntity[]|null>;
    deleteFollower(uuid:string,uuidFollower:string):Promise<UserEntity|null>;
    deleteFollowed(uuid:string,uuidFollowed:string):Promise<UserEntity|null>;
}
