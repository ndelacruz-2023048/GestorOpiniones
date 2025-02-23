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

export const registerComment = [
    body('content','Content is required').notEmpty(),
    body('visibility','Visibility is required').notEmpty().isIn(['public','private','friends_only','followers_only']).withMessage('This type of visibility is not allowed'),
    body('publicationId','PublicationId is required').notEmpty(),
    body('reactionsCount','ReactionsCount is required').optional().notEmpty().isNumeric().withMessage('Expected a number'),
    body('reported','Reported is required').optional().notEmpty().withMessage('Empty field').isBoolean().withMessage('Expected a boolean'),
    validateErrors
]

export const validateUpdateComment = [
    body('content','Content is required').notEmpty(),
    body('visibility','Visibility is required').optional().notEmpty().isIn(['public','private','friends_only','followers_only']).withMessage('This type of visibility is not allowed'),
    body('reactionsCount','ReactionsCount is required').optional().notEmpty().isNumeric().withMessage('Expected a number'),
    body('reported','Reported is required').optional().notEmpty().withMessage('Empty field').isBoolean().withMessage('Expected a boolean'),
    validateErrors
]

export const registerCategory = [
    body('name','Name is required').notEmpty(),
    body('description','Description is required').notEmpty(),
    validateErrors
]

export const validateUpdateCategory = [
    body('name','Name is required').optional().notEmpty(),
    body('description','Description is required').notEmpty(),
    validateErrors
]

export const validateLogin = [
    body('userloggin','Userloggin is required').notEmpty(),
    body('password','Password is required').notEmpty(),
    validateErrors
]