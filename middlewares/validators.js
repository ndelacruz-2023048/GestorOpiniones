import { body } from "express-validator";
import { validateErrors } from "./validate.errors.js";
import { isEmptyCategoryId, validateObjectId } from "../utils/db.validators.js";

export const registerPublication = [
    body('title','Title is required').notEmpty(),
    body('mainText','MainText is required').notEmpty(),
    body('categoryId','Category is required').notEmpty().custom(validateObjectId),
    validateErrors
]
export const updateValidPublication = [
    body('title','Title is required').notEmpty(),
    body('mainText','MainText is required').notEmpty(),
    body('categoryId','Category is required').custom(isEmptyCategoryId),
    validateErrors
]