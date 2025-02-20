import { Router } from "express";
import { login, register } from "./auth.controller.js";
import { registerClient, validateLogin } from "../../middlewares/validators.js";

const apiAuth = Router()

apiAuth.post("/auth/register",registerClient,register)
apiAuth.post("/auth/login",validateLogin,login)

export default apiAuth