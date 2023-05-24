import { ActivityUseCase } from "../../application/activityUseCase";
import { Request,Response } from "express";

export class ActivityController{
    constructor(private activityUseCase:ActivityUseCase){
        this.getActivityByIdCtrl=this.getActivityByIdCtrl.bind(this);
        this.listActivityCtrl=this.listActivityCtrl.bind(this);
        this.updateActivityCtrl=this.updateActivityCtrl.bind(this);
        this.deleteActivityCtrl=this.deleteActivityCtrl.bind(this);
        this.listActivityPagCtrl=this.listActivityPagCtrl.bind(this);
        this.getNumActivityCtrl=this.getNumActivityCtrl.bind(this);
        this.insertActivityCtrl=this.insertActivityCtrl.bind(this);
        this.getParticipantsOfActivityCtrl=this.getParticipantsOfActivityCtrl.bind(this);
    }

    public async getActivityByIdCtrl({params}:Request,res:Response){
        const { uuid = '' } = params;
        const response=await this.activityUseCase.getActivityById(`${uuid}`);
        res.send(response)
    }

    public async listActivityCtrl(req:Request,res:Response){
        const response=await this.activityUseCase.listActivity();
        res.send(response);
    }

    public async updateActivityCtrl({params,body}:Request,res:Response){
        const { uuid = '' } = params;
        const response=await this.activityUseCase.updateActivity(`${uuid}`,body);
        res.send(response);
    }

    public async deleteActivityCtrl({params}:Request,res:Response){
        const { uuid = '' } = params;
        const response=await this.activityUseCase.deleteActivity(`${uuid}`);
        res.send(response);
    }

    public async listActivityPagCtrl({params}:Request,res:Response){
        const {numPage=''}=params;
        const response=await this.activityUseCase.listActivityPag(`${numPage}`);
        res.send(response);
    }

    public async getNumActivityCtrl(req:Request,res:Response){
        const response=await this.activityUseCase.getNumActivity(); 
        const data=response ? response:"NOT_FOUND";
        res.send(data);
    }

    public async insertActivityCtrl({body}:Request,res:Response){
        const response = await this.activityUseCase.insertActivity(body);
        res.send(response);
    }

    public async getParticipantsOfActivityCtrl({params}:Request,res:Response){
        const {uuid,numPage}=params;
        const response=await this.activityUseCase.getParticipantsOfActivity(uuid,numPage); 
        const data=response ? response:"NOT_FOUND";
        res.send(data);
    }
}
