import { isValidObjectId } from "mongoose"

export const validateObjectId =(objectId)=>{
    if(!isValidObjectId(objectId)){
        throw new Error(`Invalid Object ID`)
    }
    return true
} 