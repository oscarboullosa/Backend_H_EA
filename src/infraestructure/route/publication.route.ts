import { Router } from "express";
import { PublicationUseCase } from './../../application/publicationUseCase';
import { PublicationController } from './../controller/publication.ctrl';
import { MongoPublicationRepository } from "../repository/mongoPublication.repository";

const routePublication=Router();

const publicationRepo=new MongoPublicationRepository();
const publicationUseCase = new PublicationUseCase(publicationRepo);
const publicationCtrl = new PublicationController(publicationUseCase);

routePublication.get("/publication/:uuid",publicationCtrl.getPublicationByIdCtrl);
routePublication.get("/publications/all",publicationCtrl.listPublicationCtrl);
routePublication.get("/publication/all/:numPage",publicationCtrl.listPublicationCtrl);
routePublication.get("/publication/all/count/docs",publicationCtrl.getNumPublicationsCtrl);

routePublication.put("/publication/:uuid",publicationCtrl.updatePublicationCtrl);
routePublication.put("/publication/parameter/like",publicationCtrl.updateLikesCtrl);

routePublication.delete("/publication/:uuid",publicationCtrl.deletePublicationCtrl);

routePublication.post("/publication",publicationCtrl.insertPublicationCtrl);

export default routePublication;
