import mongoose from "mongoose";
import { DB_NAME } from '../constants.js';

const connectDB = async ()=>{
    try{
        console.log("MONGODB_URI =", process.env.MONGODB_URI);
        console.log("DB_NAME =", DB_NAME);
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connected: ${connectionInstance}`);
    }
    catch(err){
        console.log("MongoDb connection error",err);
        process.exit(1);
    }
}

export default connectDB;