import { Router } from "express";
import { PublicationUseCase } from './../../application/publicationUseCase';
import { PublicationController } from './../controller/publication.ctrl';
import { MongoPublicationRepository } from "../repository/mongoPublication.repository";

const routePublication=Router();

const publicationRepo=new MongoPublicationRepository();
const publicationUseCase = new PublicationUseCase(publicationRepo);
const publicationCtrl = new PublicationController(publicationUseCase);

routePublication.get("/publication/:uuid",publicationCtrl.getPublicationByIdCtrl);//Ok
routePublication.get("/publications/all",publicationCtrl.listPublicationCtrl);//Ok
routePublication.get("/publication/all/:numPage",publicationCtrl.listPublicationCtrl);//Ok
routePublication.get("/publication/all/count/docs",publicationCtrl.getNumPublicationsCtrl);//Ok

routePublication.put("/publication/:uuid",publicationCtrl.updatePublicationCtrl);//Ok
routePublication.put("/publication/parameter/like",publicationCtrl.updateLikesCtrl);//Ok

routePublication.delete("/publication/:uuid",publicationCtrl.deletePublicationCtrl);//Ok

routePublication.post("/publication",publicationCtrl.insertPublicationCtrl);//Ok

export default routePublication;
