import mongoose, { Types } from 'mongoose';
import { PublicationEntity } from '../../domain/publication/publication.entity';
import PublicationModel from '../model/publication.schema';
import UserModel from "../model/user.schema";
import { PublicationRepository } from './../../domain/publication/publication.repository';


export class MongoPublicationRepository implements PublicationRepository{
    async getPublicationById(uuid: string): Promise<any> {
        const response = await PublicationModel.findOne({_id:uuid});
        return response;
    }

    async listPublication(): Promise<any> {
        const response=await PublicationModel.find();
        return response;
    }

    async updatePublication(uuid: string, data: PublicationEntity): Promise<any> {
        const response=await PublicationModel.findOneAndUpdate({_id:uuid},data,{new:true});
        return response;
    }


    async insertPublication(data: PublicationEntity): Promise<any> {
        console.log(data);
        const item = await PublicationModel.create(data);
        console.log(item);
        
        // Actualizar la propiedad uuid con el valor de response._id
        const updatedData = {
            ...data,
            uuid: item._id,
        };
        
        // Realizar la actualización en la base de datos
        const response= await PublicationModel.updateOne({ _id: item._id }, updatedData);
        console.log(response);
        return response;
    }
      

    async deletePublication(uuid: string): Promise<any> {
        const response=await PublicationModel.findOneAndRemove({_id:uuid});
        console.log(response);
        return response;
    }
    
    async listPublicationsPag(numPage: string): Promise<any> {
        const items=2;
        const hop = (parseInt(numPage,10) - 1) * items;
        const response = await PublicationModel.find({}).skip(hop).limit(items).exec();
        return response;
    }

    async getNumPublications(): Promise<any> {
        const response=(await PublicationModel.countDocuments({})).toString();
        return response;
    }

    async getFollowingPost(numPage:string, uuid:string): Promise<any> {
        console.log("numPage Publications" + numPage)
        // Obtener los IDs de los usuarios seguidos
        const user = await UserModel.findById({_id:uuid}).exec();
        console.log(user);
        const idsFollowedUsers = user?.followedUser;
        if(!idsFollowedUsers || idsFollowedUsers.length === 0){
        return [];
        }
        
        const publicationsByPage = 3;
        // Obtener las publicaciones de los usuarios seguidos
        const jump = (parseInt(numPage) - 1) * publicationsByPage;
        const publications = await PublicationModel.find({ idUser: { $in: idsFollowedUsers } }).sort({ createdAt: -1 }).skip(jump).limit(publicationsByPage).populate("idUser").exec();
        console.log(publications);
        return publications;
    }

    async updateLikes(uuid: string, uuidUser: string): Promise<any> {
        const responseItem = await PublicationModel.findOneAndUpdate(
            {_id: uuid}, 
            { $addToSet: {likesPublication: new Types.ObjectId(uuidUser) } } ,
            {new: true}
            )
        return responseItem;
    }
}
