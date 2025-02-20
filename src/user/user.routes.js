import { Router } from "express";
import { getUsers } from "./user.controller.js";

const apiUser = Router()

apiUser.get("/getUsers",getUsers)

export default apiUser