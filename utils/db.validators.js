import { isValidObjectId } from "mongoose"

export const validateObjectId =(objectId)=>{
    if(!isValidObjectId(objectId)){
        throw new Error(`Invalid Object ID`)
    }
    return true
} 

export const isEmptyCategoryId = (categoryId)=>{
    if(categoryId){
        throw new Error("You can't update the atribute categoryId")
    }
    return true
}