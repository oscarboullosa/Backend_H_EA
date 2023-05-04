import { ApplicationController } from './../controller/application.ctrl';
import { ApplicationUseCase } from './../../application/applicationUseCase';
import { Router } from "express";
import { MongoApplicationRepository } from "../repository/mongoApplication.repository";

const routeApplication=Router();

const applicationRepo=new MongoApplicationRepository();
const applicationUseCase=new ApplicationUseCase(applicationRepo);
const applicationCtrl=new ApplicationController(applicationUseCase);

routeApplication.get("/application/:uuid",applicationCtrl.getApplicationByIdCtrl);//OK
routeApplication.get("/applications/all",applicationCtrl.listApplicationCtrl);//OK
routeApplication.get("/application/paginated/:numPage",applicationCtrl.listApplicationPagCtrl);//OK
routeApplication.get("/application/all/count/docs",applicationCtrl.getNumApplicationsCtrl);//OK

routeApplication.post("/application/add",applicationCtrl.insertApplicationCtrl);//OK

routeApplication.put("/application/:uuid",applicationCtrl.updateApplicationCtrl);//OK

routeApplication.delete("/application/:uuid",applicationCtrl.deleteApplicationCtrl);//OK

export default routeApplication;
