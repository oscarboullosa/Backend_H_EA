import { UserUseCase } from "../../application/userUseCase";
import { Request,Response } from "express";


export class UserController{
    constructor(private userUseCase:UserUseCase){
        this.getUserByIdCtrl = this.getUserByIdCtrl.bind(this);
        this.listUserCtrl=this.listUserCtrl.bind(this);
        this.updateUserCtrl=this.updateUserCtrl.bind(this);
        this.registerUserCtrl=this.registerUserCtrl.bind(this);
        this.loginUserCtrl=this.loginUserCtrl.bind(this);
        this.deleteUserCtrl=this.deleteUserCtrl.bind(this);
        this.listUserPagCtrl=this.listUserPagCtrl.bind(this);
        this.getNumUsersCtrl=this.getNumUsersCtrl.bind(this);

        this.listFollowersPagCtrl=this.listFollowersPagCtrl.bind(this);
        this.listFollowedPagCtrl=this.listFollowedPagCtrl.bind(this);
        this.insertFollowerCtrl=this.insertFollowerCtrl.bind(this);
        this.insertFollowedCtrl=this.insertFollowedCtrl.bind(this);
        this.deleteFollowerCtrl=this.deleteFollowerCtrl.bind(this);
    }

    public async getUserByIdCtrl({params}:Request,res:Response){
        const { uuid = '' } = params;
        console.log(params);
        const response=await this.userUseCase.getUserById(`${uuid}`);
        res.send({response})
    }

    public async listUserCtrl(req:Request,res:Response){
        const response=await this.userUseCase.listUser();
        console.log(response);
        res.send({response});
    }

    public async updateUserCtrl({params,body}:Request,res:Response){
        const { uuid = '' } = params;
        const response=await this.userUseCase.updateUser(`${uuid}`,body);
        res.send(response);
    }

    public async registerUserCtrl({body}:Request,res:Response){
        const response = await this.userUseCase.registerUser(body);
        res.send(response);
    }

    public async loginUserCtrl({ body }: Request, res: Response){
        const response=await this.userUseCase.loginUser(body);
        res.send(response);
    }

    public async deleteUserCtrl({params}:Request,res:Response){
        const { uuid = '' } = params;
        const response=await this.userUseCase.deleteUser(`${uuid}`);
        res.send(response);
    }

    public async listUserPagCtrl({params}:Request,res:Response){
        const {numPage=''}=params;
        const response=await this.userUseCase.listUserPag(`${numPage}`);
        res.send(response);
    }

    public async getNumUsersCtrl(req:Request,res:Response){
        const response=await this.userUseCase.getNumUsers(); 
        const data=response ? response:"NOT_FOUND";
        res.send(data);
    }
    

    public async listFollowersPagCtrl(req: Request, res: Response){
        const { uuid = '' } = req.query;
        const { numPage = '' } = req.query;

        const response = await this.userUseCase.listFollowersPag(`${uuid}`, `${numPage}`);
        res.send(response);
    }

    public async listFollowedPagCtrl(req: Request, res: Response){
        const { uuid = '' } = req.query;
        const { numPage = '' } = req.query;

        const response = await this.userUseCase.listFollowedPag(`${uuid}`, `${numPage}`);
        res.send(response);
    }

    public async insertFollowerCtrl({body}:Request,res:Response){
        const{uuid,uuidFollower}=body;
        const response=await this.userUseCase.insertFollower(uuid,uuidFollower);
        res.send(response);
    }

    public async insertFollowedCtrl({body}:Request,res:Response){
        const{uuid,uuidFollowed}=body;
        const response=await this.userUseCase.insertFollowed(uuid,uuidFollowed);
        res.send(response);
    }

    public async deleteFollowerCtrl(req:Request,res:Response){
        const { uuid, uuidFollower } = req.params;
        const response = await this.userUseCase.deleteFollower(uuid, uuidFollower);
        res.send(response);
    }

    public async deleteFollowedCtrl(req:Request,res:Response){
        const { uuid, uuidFollowed } = req.params;
        const response = await this.userUseCase.deleteFollowed(uuid, uuidFollowed);
        res.send(response);
    }
}

