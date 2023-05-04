import { Router } from "express";
import { MongoActivityRepository } from "../repository/mongoActivity.repository";
import { ActivityUseCase } from "../../application/activityUseCase";
import { ActivityController } from "../controller/activity.ctrl";


const routeActivity=Router();

const activityRepo=new MongoActivityRepository();
const activityUseCase = new ActivityUseCase(activityRepo)
const activityCtrl = new ActivityController(activityUseCase)

routeActivity.get("/activity/:uuid",activityCtrl.getActivityByIdCtrl);
routeActivity.get("/activities/all",activityCtrl.listActivityCtrl);
routeActivity.get("/activity/paginated/:numPage",activityCtrl.listActivityPagCtrl);
routeActivity.get("/activity/all/participants",activityCtrl.getParticipantsOfActivityCtrl);
routeActivity.get("/activity/all/count/docs",activityCtrl.getNumActivityCtrl);

routeActivity.post("/activity/add",activityCtrl.insertActivityCtrl);

routeActivity.put("/activity/:uuid",activityCtrl.updateActivityCtrl);

routeActivity.delete("/activity/:uuid",activityCtrl.deleteActivityCtrl);

export default routeActivity;