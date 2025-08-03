import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const VideoSchema=new mongoose.Schema({
    videoFile:{
        type:String,
        required:[true,"video file is required"],
    },
    thumbnail:{
        type:String,
        required:[true,"thumbnail is required"],
    },
    title:{
        type:String,
        required:[true,"title is required"],
    },
    description:{
        type:String,
    },
    duration:{
        type:Number,
        required:[true,"duration is required"],
    },
    views:{
        type:Number,
        default:0,
    },
    isPublished:{
        type:Boolean,
        default:true,
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"owner is required"],
    },
   
    
},{timestamps:true})

VideoSchema.plugin(mongooseAggregatePaginate)

export const Video=mongoose.model("Video",VideoSchema);