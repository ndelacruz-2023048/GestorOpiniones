import { model, Schema } from "mongoose";

const Publication = Schema({
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
        ref:'Category',
        required:[true, "Category is required"]
    }
},
{
    timestamps:true
}
)

export default model('Publication',Publication)
