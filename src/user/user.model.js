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
        required:[true,'The username is required'],
        lowercase:true
    },
    email:{
        type:String,
        required:[true,'The email is required']
    },
    password:{
        type:String,
        required:[true,'The password is required']
    },
    role:{
        type:String,
        enum:['client','admin'],
        required:[true,'The roles is required'],
        default:'client'
    }
})

export default model('User',user)