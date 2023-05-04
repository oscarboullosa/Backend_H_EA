import mongoose, { Types } from 'mongoose';
import { PublicationEntity } from '../../domain/publication/publication.entity';
import PublicationModel from '../model/publication.schema';
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
        const response=await PublicationModel.create(data);
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

    async updateLikes(uuid: string, uuidUser: string): Promise<any> {
        const responseItem = await PublicationModel.findOneAndUpdate(
            {_id: uuid}, 
            { $addToSet: {likesPublication: new Types.ObjectId(uuidUser) } } ,
            {new: true}
            )
        return responseItem;
    }
}
