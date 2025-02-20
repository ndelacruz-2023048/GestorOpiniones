import { model, Schema } from "mongoose";

export const user = Schema({
    name:{
        type:String,
        required:[true,"Name is required"]
    },
    lastname:{
        type:String,
        required:[true,"Lastname is required"]
    },
    age:{
        type:Number,
        required:[true,'The age is required']
    },
    username:{
        type:String,
        required:[true,'The username is required']
    },
    email:{
        type:String,
        required:[true,'The email is required']
    },
    password:{
        type:String,
        required:[true,'The password is required']
    }
})

export default model('User',user)