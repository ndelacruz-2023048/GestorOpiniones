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

export const registerClient = [
    body('name','Name is required').notEmpty(),
    body('lastname','Lastname is required').notEmpty(),
    body('age','Age is required').notEmpty(),
    body('username','Username is required').notEmpty(),
    body('email','Email is required').notEmpty().isEmail(),
    body('password','Password is required').notEmpty().isStrongPassword().withMessage("Is not a strong password"),
    validateErrors
]

export const validateLogin = [
    body('userloggin','Userloggin is required').notEmpty(),
    body('password','Password is required').notEmpty(),
    validateErrors
]