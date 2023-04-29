import { UserRepository } from "../domain/user.repository";
import { UserValue } from "../domain/user.value";

export class UserUseCase{
    constructor(private readonly userRepository:UserRepository){}

    public getUserById=async(uuid:string)=>{
        const user=await this.userRepository.getUserById(uuid);
        return user;
    }

    public listUser=async()=>{
        const listUser=await this.userRepository.listUser();
        return listUser;
    }

    public updateUser=async({uuid,appUser,nameUser,surnameUser,photoUser,birthdateUser,genderUser,ocupationUser,descriptionUser,roleUser,privacyUser,deletedUser,followedUser,followersUser}:{uuid:string,appUser:string,nameUser:string,surnameUser:string,photoUser:string,birthdateUser:Date,genderUser:"male" | "female",ocupationUser?: string,descriptionUser: string,roleUser: "admin" | "common" | "verified" | "business",privacyUser: boolean,deletedUser: boolean,followersUser?: [string],followedUser?: [string]})=>{
        const userValue=new UserValue({appUser,nameUser,surnameUser,photoUser,birthdateUser,genderUser,ocupationUser,descriptionUser,roleUser,privacyUser,deletedUser,followedUser,followersUser});
        const user=await this.userRepository.updateUser(uuid,userValue);
        return user;
    }

    public insertUser=async({appUser,nameUser,surnameUser,photoUser,birthdateUser,genderUser,ocupationUser,descriptionUser,roleUser,privacyUser,deletedUser,followedUser,followersUser}:{appUser:string,nameUser:string,surnameUser:string,photoUser:string,birthdateUser:Date,genderUser:"male" | "female",ocupationUser?: string,descriptionUser: string,roleUser: "admin" | "common" | "verified" | "business",privacyUser: boolean,deletedUser: boolean,followersUser?: [string],followedUser?: [string]})=>{
        const userValue=new UserValue({appUser,nameUser,surnameUser,photoUser,birthdateUser,genderUser,ocupationUser,descriptionUser,roleUser,privacyUser,deletedUser,followedUser,followersUser});
        const user=await this.userRepository.insertUser(userValue);
        return user;
    }

    public deleteUser=async(uuid:string)=>{
        const user=await this.userRepository.deleteUser(uuid);
        return user;
    }

    public listUserPag=async(numPage:string)=>{
        const listUser=await this.userRepository.listUserPag(numPage);
        return listUser;
    }

    public getNumUsers=async()=>{
        const numUsers=await this.userRepository.getNumUsers();
        return numUsers;
    }


    public listFollowersPag=async(uuid:string,numPage:string)=>{
        const listUser=await this.userRepository.listFollowersPag(uuid,numPage);
        return listUser;
    }

    public listFollowedPag=async(uuid:string,numPage:string)=>{
        const listUser=await this.userRepository.listFollowedPag(uuid,numPage);
        return listUser;
    }

    public insertFollower=async(uuid:string,uuidFollower:string)=>{
        const follower=await this.userRepository.insertFollower(uuid,uuidFollower);
        return follower;
    }

    public insertFollowed=async(uuid:string,uuidFollowed:string)=>{
        const followed=await this.userRepository.insertFollowed(uuid,uuidFollowed);
        return followed;
    }

    public deleteFollower=async(uuid:string,uuidFollower:string)=>{
        const follower=await this.userRepository.deleteFollower(uuid,uuidFollower);
        return follower;
    }
    
    public deleteFollowed=async(uuid:string,uuidFollowed:string)=>{
        const followed=await this.userRepository.deleteFollowed(uuid,uuidFollowed);
        return followed;
    }
}