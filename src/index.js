// require('dotenv').config({path:'./env'})
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import { DB_NAME } from './constants.js';
import connectDB from './db/dbconnect.js';



dotenv.config({
  path: "./public/temp/.env"
})
// import dbconnect from 'src/db/dbconnect.js'

// import express from 'express'
// const app = express()
// // ;(async()=>{})()

// (async()=>{
//     try{
//         mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on("error",(err)=>{
//             console.log("error: ",err);
//             throw err
//         })
//         app.listen(process.env.PORT,()=>{
//             console.log(`App is listening on port ${process.env.PORT}`)
//         })
//     }
//     catch(error){
//         console.error(`Error in onnection: ${error}`);
//         throw error
//     }
// })()

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO DB connection failed !!!",err);
})

