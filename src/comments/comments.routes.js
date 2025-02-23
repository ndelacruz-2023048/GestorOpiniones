import { Router } from "express";
import { deleteComment, getCommentByUser, newComment, updateComment } from "./comments.controller.js";
import { registerComment, validateUpdateComment } from "../../middlewares/validators.js";
import { validateJwt } from "../../middlewares/validate.jwt.js";

const apiComment = Router();

apiComment.get('/comment_by_user',validateJwt,getCommentByUser)
apiComment.post("/comment_new",registerComment,newComment)
apiComment.put("/comment_update/:commentId",validateJwt,validateUpdateComment,updateComment)
apiComment.delete("/comment_delete/:commentId",validateJwt,deleteComment)

export default apiComment