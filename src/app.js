import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'; //to access cookies of the user servers
const app = express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}));

app.use(express.json({limit:"16kb"}))

app.use(express.urlencoded({extended:true,limit:"16kb"})) //url ko encod karne ke liye

app.use(express.static("public")) //storing some files,datas in personal server

app.use(cookieParser());


//routes
import userRouter from './Routes/User.routes.js'

//routes declaration
app.use("/api/v1/user",userRouter);
export {app}