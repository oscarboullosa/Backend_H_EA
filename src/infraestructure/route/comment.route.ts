import { Router } from "express";
import { MongoCommentRepository } from "../repository/mongoComment.repository";
import { CommentUseCase } from "../../application/commentUseCase";
import { CommentController } from "../controller/comment.ctrl";

const routeComment=Router();

const commentRepo=new MongoCommentRepository();
const commentUseCase = new CommentUseCase(commentRepo)
const commentCtrl = new CommentController(commentUseCase)

routeComment.get("/comment/:uuidPublication/:numPage",commentCtrl.getCommentPublicationByIdPagCtrl);
routeComment.get("/comment/response/:uuid",commentCtrl.responseCommentCtrl);
routeComment.get("/comments/all",commentCtrl.listCommentCtrl);
routeComment.get("/comment/comment/:uuid",commentCtrl.getCommentByIdCtrl);
routeComment.get("/comment/paginated/:numPage",commentCtrl.listCommentPagCtrl);
routeComment.get("/commentresponses/:uuid/:numPage",commentCtrl.listResponsesPagCtrl);
routeComment.get("/comment/number",commentCtrl.getNumCommentsCtrl);


routeComment.post("/comment/add",commentCtrl.insertCommentPublicationCtrl);

routeComment.put("/comment/:uuid",commentCtrl.updateCommentPublicationCtrl);
routeComment.put("/comment/likes/:uuid/:uuidUser",commentCtrl.updateLikesCtrl);

routeComment.delete("/comment/:uuid",commentCtrl.deleteCommentPublicationCtrl);

export default routeComment;
