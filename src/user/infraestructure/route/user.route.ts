import { Router } from "express";
import { UserUseCase } from "../../application/userUseCase";
import { UserController } from "../controller/user.ctrl";
import { MongoRepository } from "../repository/mongo.repository";

const route = Router();

const userRepo=new MongoRepository();
const userUseCase = new UserUseCase(userRepo)
const userCtrl = new UserController(userUseCase)

route.get("/user/:uuid",userCtrl.getUserByIdCtrl);
route.get("/user/all",userCtrl.listUserCtrl);
route.get("/user/all/:numPage",userCtrl.listUserPagCtrl);
route.get("/user/all/count/docs",userCtrl.getNumUsersCtrl);
route.get("/user/follower/:uuid/:numPage", userCtrl.listFollowersPagCtrl);
route.get("/user/followed/:uuid/:numPage", userCtrl.listFollowedPagCtrl);

route.put("/user/:uuid",userCtrl.updateUserCtrl);

route.post('/user/follower', userCtrl.insertFollowerCtrl);
route.post('/user/followed', userCtrl.insertFollowedCtrl);
route.post('/user/register',userCtrl.registerUserCtrl);
route.post('/user/login',userCtrl.loginUserCtrl);

route.delete("/user/:uuid",userCtrl.deleteUserCtrl);
route.delete('/user/follower/:uuid/:uuidfollower', userCtrl.deleteFollowerCtrl);
route.delete('/user/followed/:uuid/:uuidfollowed', userCtrl.deleteFollowedCtrl);


export default route;