import { Router } from "express";
import { UserUseCase } from "../../application/userUseCase";
import { UserController } from "../controller/user.ctrl";
import { MongoUserRepository } from "../repository/mongoUser.repository";
import { logMiddleware } from "../controller/login.ctrl";

const routeUser = Router();

const userRepo=new MongoUserRepository();
const userUseCase = new UserUseCase(userRepo)
const userCtrl = new UserController(userUseCase)

routeUser.get("/user/:uuid",userCtrl.getUserByIdCtrl);
routeUser.get("/users/all",logMiddleware);
routeUser.get("/user/all/:numPage",userCtrl.listUserPagCtrl);
routeUser.get("/user/all/count/docs",userCtrl.getNumUsersCtrl);
routeUser.get("/user/follower/:uuid/:numPage", userCtrl.listFollowersPagCtrl);
routeUser.get("/user/followed/:uuid/:numPage", userCtrl.listFollowedPagCtrl);

routeUser.put("/user/:uuid",userCtrl.updateUserCtrl);

routeUser.post('/user/follower', userCtrl.insertFollowerCtrl);
routeUser.post('/user/followed', userCtrl.insertFollowedCtrl);
routeUser.post('/user/register',userCtrl.registerUserCtrl);
routeUser.post('/user/login',userCtrl.loginUserCtrl);

routeUser.delete("/user/:uuid",userCtrl.deleteUserCtrl);
routeUser.delete('/user/follower/:uuid/:uuidfollower', userCtrl.deleteFollowerCtrl);
routeUser.delete('/user/followed/:uuid/:uuidfollowed', userCtrl.deleteFollowedCtrl);


export default routeUser;