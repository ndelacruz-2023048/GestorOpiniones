import { validationResult } from "express-validator"

export const validateErrors = (request,response,next)=>{
    const errors = validationResult(request)
    console.log(errors)
    if(!errors.isEmpty()){
        return response.status(400).send({success:false,errors:errors})
    }
    next()
}