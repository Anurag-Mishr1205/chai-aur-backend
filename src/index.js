// require("dotenv").config({path:"./env"});
import dotenv from "dotenv";    

import express from "express";
import connectDB from "./db/index.js";
const app=express();

dotenv.config({path:"./env"});
connectDB();






// (async()=>{
//     try{
//         await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
//         console.log("Connected to MongoDB")
//         app.on("error",()=>{
//             console.log(error);
//             throw error;
//         });
//         app.listen(process.env.PORT,()=>{
//             console.log(`Server is running on port ${process.env.PORT}`);
//         });
//     }catch(error){
//         console.log(error);
//         process.exit(1);
//     }
// })( );