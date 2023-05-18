import { Router } from "express";
import { PublicationUseCase } from './../../application/publicationUseCase';
import { PublicationController } from './../controller/publication.ctrl';
import { MongoPublicationRepository } from "../repository/mongoPublication.repository";
import { checkJwt } from "../controller/session.ctrl";

const routePublication=Router();

const publicationRepo=new MongoPublicationRepository();
const publicationUseCase = new PublicationUseCase(publicationRepo);
const publicationCtrl = new PublicationController(publicationUseCase);

routePublication.get("/publication/:uuid",checkJwt,publicationCtrl.getPublicationByIdCtrl);//Ok
routePublication.get("/publications/all",checkJwt,publicationCtrl.listPublicationCtrl);//Ok
routePublication.get("/publication/all/:numPage",checkJwt,publicationCtrl.listPublicationCtrl);//Ok
routePublication.get("/publication/all/count/docs",checkJwt,publicationCtrl.getNumPublicationsCtrl);//Ok

routePublication.put("/publication/:uuid",publicationCtrl.updatePublicationCtrl);//Ok
routePublication.put("/publication/parameter/like",checkJwt,publicationCtrl.updateLikesCtrl);//Ok

routePublication.delete("/publication/:uuid",checkJwt,publicationCtrl.deletePublicationCtrl);//Ok

routePublication.post("/publication",checkJwt,publicationCtrl.insertPublicationCtrl);//Ok

export default routePublication;
