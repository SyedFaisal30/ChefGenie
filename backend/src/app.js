import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import axios from 'axios';

const app = express();

app.use(cors({
    origin: ["https://chefgenie.vercel.app","http://localhost:5173"],
    credentials: true
}));

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended: true,limit:"16kb"}));
app.use(express.static("public"))
app.use(cookieParser());

import userRouter from './routes/user.routes.js';
setInterval(() => {
    axios.get("https://jsonplaceholder.typicode.com/todos/1").then(res => console.log(res.data)).catch(err => console.log(err));
}, 840000);

app.use("/api/users",userRouter)

export { app };