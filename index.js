import express from "express";
import dotenv from "dotenv";

import session from "cookie-session";

import passport  from "passport";
import database from "./config/db.js";
import authroutes from "./routes/authroute.js"
import jobroutes from "./routes/jobroute.js"
import jobtyperoute from  "./routes/jobtyperoute.js"
import resumeroute from "./routes/resumeroute.js"
import appliedjobroute from "./routes/appliedjobroute.js"
import profileroute from "./routes/profileroute.js"
import passportsetup from "./passport.js";
import cors from "cors"
import path from "path"
import headersConfig from './config/nexy.js';

import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app=express()
app.use(cors()); 
app.use(
	session({
		name: "session",
		keys: ["cyberwolve"],
		maxAge: 24 * 60 * 60 * 100,
	})
);






dotenv.config();

app.use(express.json())

// const uploadsDirectory = path.join(__dirname, 'uploads');

// Serve static files from the uploads directory
// app.use('/uploads/', express.static(uploadsDirectory));
// app.use((req, res, next) => {
//     const headers = headersConfig();
//     headers.forEach(header => {
//         res.setHeader(header.key, header.value);
//     });
//     next();
// });
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups"); // Allow popups from same origin
    next();
  });
// app.use(session({
//     secret:"keyboard cat",
//     resave:false,
//     saveUninitialized:true,
//     cookie:{secure:false}
// }))
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/route/auth",authroutes)
app.use("/api/route/jobs",jobroutes)
app.use("/api/route/jobtypes",jobtyperoute)
app.use("/api/route/resume",resumeroute)
app.use("/api/route/appliedjob",appliedjobroute)
app.use("/api/route/profile",profileroute)
app.get("/",(req,res)=>{
    res.send("<h1>hi hello good morning darling </h1>")
})
database()
const port=3002
app.listen(port,()=>{
    console.log(`connected to the server  running on port ${port}`)
})

