import { ActivityEntity } from "../../domain/activity/activity.entity";
import { ActivityRepository } from "../../domain/activity/activity.repository";
import ActivityModel from "../model/activity.schema";
import UserModel from "../model/user.schema";

export class MongoActivityRepository implements ActivityRepository{

    async getActivityById(uuid: string): Promise<any> {
        const responseItem = await ActivityModel.findOne({_id: uuid })
        return responseItem;
    }

    async listActivity(): Promise<any> {
        const responseItem = await ActivityModel.find({ })
        return responseItem;
    }

    async listActivityPag(numPage: string): Promise<any> {
        const numActivityPerPage = 2;
        const hop = (parseInt(numPage) - 1) * numActivityPerPage;
        const responseItem = await ActivityModel.find({ }).skip(hop).limit(numActivityPerPage).exec();
        return responseItem;
    }

    async insertActivity(data: ActivityEntity): Promise<any> {
        const activity=await ActivityModel.create(data);
        return activity;
    }

    async updateActivity(uuid: string, data: ActivityEntity): Promise<any> {
        const responseItem = await ActivityModel.updateOne({_id: uuid},data,{new: true});
        return responseItem;
    }

    async deleteActivity(uuid: string): Promise<any> {
        const responseItem = await ActivityModel.findOneAndRemove({_id: uuid});
        return responseItem;
    }

    async getNumActivity(): Promise<any> {
        const responseItem = (await ActivityModel.countDocuments({})).toString();
        return responseItem;
    }

    async getParticipantsOfActivity(uuid: string, numPage: string): Promise<any> {
        const activitiesPerPage = 2;
        const hop = (parseInt(numPage) - 1) * activitiesPerPage;
        const activity = await ActivityModel.findById(uuid);
        if (!activity) {
        
        throw new Error(`Activity with _id=${uuid} not found`);
        }
        const responseParticipantIds = activity.participantsActivity;
        if (!responseParticipantIds || responseParticipantIds.length === 0) {
        
        return [];
        }
        const responseItem = await UserModel.find({_id: { $in: responseParticipantIds }}).skip(hop).limit(activitiesPerPage).exec();
        return responseItem;
    }
}
