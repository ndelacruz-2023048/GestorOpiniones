import { matchedData, validationResult } from "express-validator"

export const validateErrors = (request,response,next)=>{
    const errors = validationResult(request)
    if(!errors.isEmpty()){
        return response.status(400).send({success:false,errors:errors})
    }
    request.body = matchedData(request)
    next()
}