import { LocationUseCase } from './../../application/locationUseCase';
import { Router } from "express";
import { LocationController } from '../controller/location.ctrl';
import { MongoLocationRepository } from '../repository/mongoLocation.repository';
import { checkAdmin } from '../controller/session.ctrl';
import { logMiddleware } from '../controller/login.ctrl';

const locationRoute = Router();

const locationRepo=new MongoLocationRepository();
const locationUseCase = new LocationUseCase(locationRepo);
const locationCtrl = new LocationController(locationUseCase);

locationRoute.get("/location/:uuid",locationCtrl.getLocationByIdCtrl);//Ok
locationRoute.get("/locations/all",logMiddleware);//Ok
locationRoute.get("/location/all/:numPage",locationCtrl.listLocationPagCtrl);//Ok
locationRoute.get("/location/all/count/docs",locationCtrl.getNumLocationsCtrl);//ok

locationRoute.put("/location/:uuid",locationCtrl.updateLocationCtrl);//ok

locationRoute.post('/location/add',locationCtrl.insertLocationCtrl);//Ok

locationRoute.delete("/location/:uuid",checkAdmin);//Ok

export default locationRoute;
