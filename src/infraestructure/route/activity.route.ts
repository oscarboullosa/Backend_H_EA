import { Router } from "express";
import { MongoActivityRepository } from "../repository/mongoActivity.repository";
import { ActivityUseCase } from "../../application/activityUseCase";
import { ActivityController } from "../controller/activity.ctrl";


const routeActivity=Router();

const activityRepo=new MongoActivityRepository();
const activityUseCase = new ActivityUseCase(activityRepo)
const activityCtrl = new ActivityController(activityUseCase)

routeActivity.get("/activity/:uuid",activityCtrl.getActivityByIdCtrl);//OK
routeActivity.get("/activities/all",activityCtrl.listActivityCtrl);//OK
routeActivity.get("/activity/paginated/:numPage",activityCtrl.listActivityPagCtrl);//OK
routeActivity.get("/activity/all/participants/:uuid/:numPag",activityCtrl.getParticipantsOfActivityCtrl);//NO ok
routeActivity.get("/activity/all/count/docs",activityCtrl.getNumActivityCtrl);//OK

routeActivity.post("/activity/add",activityCtrl.insertActivityCtrl);//OK

routeActivity.put("/activity/:uuid",activityCtrl.updateActivityCtrl);//OK

routeActivity.delete("/activity/:uuid",activityCtrl.deleteActivityCtrl);//OK

export default routeActivity;