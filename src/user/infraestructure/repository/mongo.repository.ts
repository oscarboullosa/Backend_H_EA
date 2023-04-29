import { Types } from "mongoose";
import { UserEntity } from "../../domain/user.entity";
import { UserRepository } from "../../domain/user.repository";
import UserModel from "../model/user.schema";

export class MongoRepository implements UserRepository{

    async getUserById(uuid: string): Promise<any> {
        const response = await UserModel.findOne({uuid});
        return response;
    }

    async listUser(): Promise<any> {
        const response = await UserModel.find();
        return response;
    }

    async updateUser(uuid:string,data:UserEntity):Promise<any>{
        const response=await UserModel.findOneAndUpdate({uuid},data,{new:true});
        return response;
    }

    async insertUser(data:UserEntity):Promise<any>{
        const user = await UserModel.create(data);
        return user;
    }

    async deleteUser(uuid:string):Promise<any>{
        const response = await UserModel.findOneAndRemove({uuid});
        return response;
    }

    async listUserPag(numPage:string):Promise<any>{
        const items = 2;
        const hop = (parseInt(numPage,10) - 1) * items;
        const response = await UserModel.find({}).skip(hop).limit(items).exec();
        return response;
    }

    async getNumUsers():Promise<any>{
        const response = (await UserModel.countDocuments({})).toString();
        return response;
    }

    async listFollowersPag(uuid:string,numPage:string):Promise<any>{
        const items = 2;
        const hop = (parseInt(numPage) - 1) * items;
        const follower=await UserModel.findById(uuid);
        if(!uuid){
            throw new Error(`User with ID ${uuid} not found`);
        }
        const userFollowers = follower?.followersUser;
        if(!userFollowers || userFollowers.length ===0){
            return [];
        }
        const responseItem = await UserModel.find({_id: { $in: userFollowers }}).skip(hop).limit(items).exec();
        return responseItem;
    }

    async listFollowedPag(uuid:string,numPage:string):Promise<any>{
        const items = 2;
        const hop = (parseInt(numPage) - 1) * items;
        const followed=await UserModel.findById(uuid);
        if(!uuid){
            throw new Error(`User with ID ${uuid} not found`);
        }
        const userFollowed = followed?.followedUser;
        if(!userFollowed || userFollowed.length ===0){
            return [];
        }
        const responseItem = await UserModel.find({_id: { $in: userFollowed }}).skip(hop).limit(items).exec();
        return responseItem;
    }

    async insertFollower(uuid:string,uuidFollower:string):Promise<any>{
        const response=await UserModel.findOneAndUpdate(
            {uuid},
            {$addToSet:{followersUser:new Types.ObjectId(uuidFollower)}},
            {new:true}
        ).populate('followersUser');
        return response;
    }

    async insertFollowed(uuid:string,uuidFollowed:string):Promise<any>{
        const response=await UserModel.findOneAndUpdate(
            {uuid},
            {$addToSet:{followedUser:new Types.ObjectId(uuidFollowed)}},
            {new:true}
        ).populate('followerdUser');
        return response;
    }

    async deleteFollower(uuid:string,uuidFollower:string):Promise<any>{
        const response = await UserModel.findOneAndUpdate(
          {uuid},
          {$pull: {followersUser: new Types.ObjectId(uuidFollower)}},
          {new: true}
        );
        return response;
    }

    async deleteFollowed(uuid:string,uuidFollowed:string):Promise<any>{
        const response = await UserModel.findOneAndUpdate(
          {uuid},
          {$pull: {followedUser: new Types.ObjectId(uuidFollowed)}},
          {new: true}
        );
        return response;
    }
}