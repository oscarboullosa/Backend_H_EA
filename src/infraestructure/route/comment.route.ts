import { Router } from "express";
import { MongoCommentRepository } from "../repository/mongoComment.repository";
import { CommentUseCase } from "../../application/commentUseCase";
import { CommentController } from "../controller/comment.ctrl";

const routeComment=Router();

const commentRepo=new MongoCommentRepository();
const commentUseCase = new CommentUseCase(commentRepo)
const commentCtrl = new CommentController(commentUseCase)

routeComment.get("/comment/publication/by/paginated/:uuidPublication/:numPage",commentCtrl.getCommentPublicationByIdPagCtrl);//Ok
routeComment.get("/comment/response/:uuid",commentCtrl.responseCommentCtrl);//OK
routeComment.get("/comments/all",commentCtrl.listCommentCtrl);//OK
routeComment.get("/comment/comment/id/:uuid",commentCtrl.getCommentByIdCtrl);//Ok
routeComment.get("/comment/paginated/page/num/:numPage",commentCtrl.listCommentPagCtrl);//Ok
routeComment.get("/commentresponses/list/responses/:uuid/:numPage",commentCtrl.listResponsesPagCtrl);//Ok
routeComment.get("/comment/number",commentCtrl.getNumCommentsCtrl);//ok


routeComment.post("/comment/add",commentCtrl.insertCommentPublicationCtrl);//OK
routeComment.post("/comment/response/:uuid",commentCtrl.responseCommentCtrl);//To fix

routeComment.put("/comment/:uuid",commentCtrl.updateCommentPublicationCtrl);//Ok
routeComment.put("/comment/likes/:uuid/:uuidUser",commentCtrl.updateLikesCtrl);//ok

routeComment.delete("/comment/:uuid",commentCtrl.deleteCommentPublicationCtrl);//Ok

export default routeComment;
