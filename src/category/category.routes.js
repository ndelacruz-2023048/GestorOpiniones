import { Router } from "express";
import { deleteCategory, getCategories, newCategory, updateCategory } from "./category.controller.js";
import { validateJwt } from "../../middlewares/validate.jwt.js";
import { registerCategory, validateUpdateCategory } from "../../middlewares/validators.js";

const apiCategory = Router()

apiCategory.get('/categories',getCategories)
apiCategory.post('/category_new',validateJwt,registerCategory,newCategory)
apiCategory.put('/category_update/:categoryId',validateJwt,validateUpdateCategory,updateCategory)
apiCategory.delete('/category_delete/:categoryId',validateJwt,deleteCategory)

export default apiCategory
