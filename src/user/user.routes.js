import { Router } from "express";
import { getUsers, updateUser } from "./user.controller.js";
import { validateJwt } from "../../middlewares/validate.jwt.js";
import { validateUpdateUser } from "../../middlewares/validators.js";

const apiUser = Router()

apiUser.get("/getUsers",validateJwt,getUsers)
apiUser.put("/profile_update",validateJwt,validateUpdateUser,updateUser)

export default apiUser