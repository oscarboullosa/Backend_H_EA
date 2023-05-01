import { LocationUseCase } from './../../application/locationUseCase';
import { Router } from "express";
import { LocationController } from '../controller/location.ctrl';
import { MongoLocationRepository } from '../repository/mongoLocation.repository';

const locationRoute = Router();

const locationRepo=new MongoLocationRepository();
const locationUseCase = new LocationUseCase(locationRepo);
const locationCtrl = new LocationController(locationUseCase);

locationRoute.get("/location/:uuid",locationCtrl.getLocationByIdCtrl);
locationRoute.get("/locations/all",locationCtrl.listLocationCtrl);
locationRoute.get("/location/all/:numPage",locationCtrl.listLocationPagCtrl);
locationRoute.get("/location/all/count/docs",locationCtrl.getNumLocationsCtrl);

locationRoute.put("/location/:uuid",locationCtrl.updateLocationCtrl);

locationRoute.post('/location/add',locationCtrl.insertLocationCtrl);

locationRoute.delete("/location/:uuid",locationCtrl.deleteLocationCtrl);

export default locationRoute;
