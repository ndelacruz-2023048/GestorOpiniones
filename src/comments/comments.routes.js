import { Router } from "express";
import { newComment } from "./comments.controller.js";
import { registerComment } from "../../middlewares/validators.js";

const apiComment = Router();

apiComment.post("/comment_new",registerComment,newComment)

export default apiComment