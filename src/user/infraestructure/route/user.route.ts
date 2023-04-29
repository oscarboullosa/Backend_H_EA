import { Router } from "express";
import { UserUseCase } from "../../application/userUserCase";
import { UserController } from "../controller/user.ctrl";
import { MongoRepository } from "../repository/mongo.repository";

const route = Router();

const userRepo=new MongoRepository();
const userUseCase = new UserUseCase(userRepo)
const userCtrl = new UserController(userUseCase)

route.get("/:uuid",userCtrl.getUserByIdCtrl);
route.get("/all",userCtrl.listUserCtrl);
route.get("/all/:numPage",userCtrl.listUserPagCtrl);
route.get("/all/count/docs",userCtrl.getNumUsersCtrl);
route.get("/follower/:uuid/:numPage", userCtrl.listFollowersPagCtrl);
route.get("/followed/:uuid/:numPage", userCtrl.listFollowedPagCtrl);

route.put("/:uuid",userCtrl.updateUserCtrl);

route.post("/user",userCtrl.insertUserCtrl);
route.post('/follower', userCtrl.insertFollowerCtrl);
route.post('/followed', userCtrl.insertFollowedCtrl);

route.delete("/:uuid",userCtrl.deleteUserCtrl);
route.delete('/follower/:uuid/:uuidfollower', userCtrl.deleteFollowerCtrl);
route.delete('/followed/:uuid/:uuidfollowed', userCtrl.deleteFollowedCtrl);


export default route;