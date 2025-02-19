import { Schema } from "mongoose";

export const Publications = Schema({
    title:{
        type:String,
        required:[true, "Title is required"]
    },
    mainText:{
        type:String,
        required:[true, "Main text is required"]
    },
    category:{
        type: Schema.Types.ObjectId,
        ref:'Categories',
        required:[true, "Category is required"]
    }
},
{
    timestamps:true
}
)