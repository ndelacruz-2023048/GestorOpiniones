import { model, Schema } from "mongoose";

const Category = Schema({
    name:{
        type:String,
        required:[true, "Name is required"]
    },
    description:{
        type:String,
        required:[true, "Description is required"]
    }
},
{
    timestamps:true
})

export default model('Category',Category)
