
import { Router } from "express"
import { getPublications } from "../publications/publications.controller.js"

const apiCategory = Router()

apiCategory.get('/categories',getPublications)

export default apiCategory
