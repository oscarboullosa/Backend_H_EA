import { PublicationUseCase } from "../../application/publicationUseCase";
import { Request,Response } from "express";

export class PublicationController{
    constructor(private publicationUseCase:PublicationUseCase){
        this.getPublicationByIdCtrl=this.getPublicationByIdCtrl.bind(this);
        this.listPublicationCtrl=this.listPublicationCtrl.bind(this);
        this.updatePublicationCtrl=this.updatePublicationCtrl.bind(this);
        this.insertPublicationCtrl=this.insertPublicationCtrl.bind(this);
        this.deletePublicationCtrl=this.deletePublicationCtrl.bind(this);
        this.listPublicationPagCtrl=this.listPublicationPagCtrl.bind(this);
        this.getNumPublicationsCtrl=this.getNumPublicationsCtrl.bind(this);
        this.updateLikesCtrl=this.updateLikesCtrl.bind(this);
    }

    public async getPublicationByIdCtrl({params}:Request,res:Response){
        const { uuid = '' } = params;
        console.log(params);
        const response=await this.publicationUseCase.getPublicationById(`${uuid}`);
        res.send({response})
    }

    public async listPublicationCtrl(req:Request,res:Response){
        const response=await this.publicationUseCase.listPublication();
        console.log(response);
        res.send({response});
    }

    public async updatePublicationCtrl({params,body}:Request,res:Response){
        const { uuid = '' } = params;
        const response=await this.publicationUseCase.updatePublication(`${uuid}`,body);
        res.send(response);
    }

    public async insertPublicationCtrl({body}:Request,res:Response){
        const response=await this.publicationUseCase.insertPublication(body);
        res.send(response);
    }

    public async deletePublicationCtrl({params}:Request,res:Response){
        const { uuid = '' } = params;
        const response=await this.publicationUseCase.deletePublication(`${uuid}`);
        res.send(response);
    }

    public async listPublicationPagCtrl({params}:Request,res:Response){
        const {numPage=''}=params;
        const response=await this.publicationUseCase.listPublicationsPag(`${numPage}`);
        res.send(response);
    }

    public async getNumPublicationsCtrl(req:Request,res:Response){
        const response=await this.publicationUseCase.getNumPublications();
        const data=response ? response:"NOT_FOUND";
        res.send(data);
    }

    public async updateLikesCtrl({params}:Request,res:Response){
        const {uuid, uuidUser}=params;
        const response=await this.publicationUseCase.updateLikes(uuid,uuidUser);
        res.send(response);
    }
}
