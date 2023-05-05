import { Router } from "express";
import { UserUseCase } from "../../application/userUseCase";
import { UserController } from "../controller/user.ctrl";
import { MongoUserRepository } from "../repository/mongoUser.repository";
import { logMiddleware } from "../controller/login.ctrl";

const routeUser = Router();

const userRepo=new MongoUserRepository();
const userUseCase = new UserUseCase(userRepo)
const userCtrl = new UserController(userUseCase)

routeUser.get("/user/:uuid",userCtrl.getUserByIdCtrl);//ok
routeUser.get("/users/all",logMiddleware,userCtrl.listUserCtrl);//OK
routeUser.get("/user/all/:numPage",userCtrl.listUserPagCtrl);//ok
routeUser.get("/user/all/count/docs",userCtrl.getNumUsersCtrl);
routeUser.get("/user/follower/:uuid/:numPage", userCtrl.listFollowersPagCtrl);//ok
routeUser.get("/user/followed/:uuid/:numPage", userCtrl.listFollowedPagCtrl);//ok

routeUser.put("/user/:uuid",userCtrl.updateUserCtrl);//ok

routeUser.post('/user/follower', userCtrl.insertFollowerCtrl);//ok
routeUser.post('/user/followed', userCtrl.insertFollowedCtrl);//ok
routeUser.post('/user/register',userCtrl.registerUserCtrl);//ok
routeUser.post('/user/login',userCtrl.loginUserCtrl);//Ok

routeUser.delete("/user/:uuid",userCtrl.deleteUserCtrl);//ok
routeUser.delete('/user/follower/this', userCtrl.deleteFollowerCtrl);
routeUser.delete('/user/followed/this', userCtrl.deleteFollowedCtrl);


export default routeUser;