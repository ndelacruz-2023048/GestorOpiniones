import { Router } from "express";
import { getUsers } from "./user.controller.js";
import { validateJwt } from "../../middlewares/validate.jwt.js";

const apiUser = Router()

apiUser.get("/getUsers",validateJwt,getUsers)

export default apiUser