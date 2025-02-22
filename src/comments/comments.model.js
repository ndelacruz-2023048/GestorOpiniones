import { model, Schema } from "mongoose";

const commentSchema = Schema({
    content:{
        type:String,
        required:true
    },
    reactionsCount:{
        type:Number,
        default:0
    },
    visibility:{
        type:String,
        enum:['public','private','friends_only','followers_only'],
    },
    reported:{
        type:Boolean,
        default:false
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    publicationId:{
        type:Schema.Types.ObjectId,
        ref:'Publication',
        required:true
    }

})

export default model('Comment',commentSchema)