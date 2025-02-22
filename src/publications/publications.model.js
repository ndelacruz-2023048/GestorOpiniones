import { model, Schema } from "mongoose";

const publicationSchema = Schema({
    title:{
        type:String,
        required:[true, "Title is required"]
    },
    mainText:{
        type:String,
        required:[true, "Main text is required"]
    },
    categoryId:{
        type: Schema.Types.ObjectId,
        ref:'Category',
        required:[true, "Category is required"]
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:[true,'User Id is required']
    }
},
{
    timestamps:true
}
)

export default model('Publication',publicationSchema)
