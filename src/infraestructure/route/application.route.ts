import { ApplicationController } from './../controller/application.ctrl';
import { ApplicationUseCase } from './../../application/applicationUseCase';
import { Router } from "express";
import { MongoApplicationRepository } from "../repository/mongoApplication.repository";

const routeApplication=Router();

const applicationRepo=new MongoApplicationRepository();
const applicationUseCase=new ApplicationUseCase(applicationRepo);
const applicationCtrl=new ApplicationController(applicationUseCase);

routeApplication.get("/application/:uuid",applicationCtrl.getApplicationByIdCtrl);
routeApplication.get("/applications/all",applicationCtrl.listApplicationCtrl);
routeApplication.get("/application/paginated/:numPage",applicationCtrl.listApplicationPagCtrl);
routeApplication.get("/application/all/count/docs",applicationCtrl.getNumApplicationsCtrl);

routeApplication.post("/application/add",applicationCtrl.insertApplicationCtrl);

routeApplication.put("/application/:uuid",applicationCtrl.updateApplicationCtrl);

routeApplication.delete("/application/:uuid",applicationCtrl.deleteApplicationCtrl);

export default routeApplication;
