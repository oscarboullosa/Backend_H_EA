import { LocationUseCase } from './../../application/locationUseCase';
import { Router } from "express";
import { LocationController } from '../controller/location.ctrl';
import { MongoLocationRepository } from '../repository/mongoLocation.repository';

const route = Router();

const locationRepo=new MongoLocationRepository();
const locationUseCase = new LocationUseCase(locationRepo);
const locationCtrl = new LocationController(locationUseCase);

route.get("/location/:uuid",locationCtrl.getLocationByIdCtrl);
route.get("/locations/all",locationCtrl.listLocationCtrl);
route.get("/location/all/:numPage",locationCtrl.listLocationPagCtrl);
route.get("/location/all/count/docs",locationCtrl.getNumLocationsCtrl);

route.put("/location/:uuid",locationCtrl.updateLocationCtrl);

route.post('/location/add',locationCtrl.insertLocationCtrl);

route.delete("/location/:uuid",locationCtrl.deleteLocationCtrl);

export default route;
