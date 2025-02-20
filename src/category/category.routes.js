import { Router } from "express";
import { getCategories } from "./category.controller.js";

const apiCategory = Router()

apiCategory.get('/categories',getCategories)

export default apiCategory
