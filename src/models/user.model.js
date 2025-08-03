import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const UserSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:[true,"username is required"],
        unique:true,
        lowercase:true,
        trim:true,
        index:true,
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true,
        lowercase:true,
        trim:true
    },
    fullName:{
        type:String,
        required:[true,"full name is required"],
        trim:true,
        index:true,
    },
    avatar:{
        type:String,//cloudinary url
        required:[true,"avatar is required"],
    },
    coverImage:{
        type:String,
    },
    watchHistory:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Video",
        }
    ],
    refreshToken:{
        type:String,
        
    },
   
    password:{
        type:String,
        required:[true,"password is required"],
    },
  
    
},{timestamps:true})


UserSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    this.password=bcrypt.hash(this.password,10)
    next()
})

UserSchema.methods.isPasswordCorrect=async function(password){
   return await bcrypt.compare(password,this.password)
}


UserSchema.methods.generateAccessToken=async function(){
    return jwt.sign(
        {
       _id:this._id,
       email:this.emaail,
       userName:this.userName,
       fullName:this.fullName

    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
)
}
UserSchema.methods.generateRefreshToken=async function(){
    return jwt.sign(
        {
       _id:this._id,
      

    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
)
}

export const User=mongoose.model("User",UserSchema);