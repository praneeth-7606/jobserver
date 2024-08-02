import express from "express";
import {addjobcontroller, deletejob,imagecontroller, appliedjobs ,showjobs,updatejob,showjob,searchcontroller,relatedjobcontroller} from "../controller/jobcontroller.js"
import { isAdmin, requireSignIn } from "../middleware/authmiddleware.js";
import multer from "multer";
import formdiable from  "express-formidable"
const jobrouter=express.Router()

// const upload = multer({ dest: 'uploads/' });
const upload = multer({ dest: 'uploads/' });

jobrouter.post("/addjob", requireSignIn, isAdmin,upload.single("photo"),addjobcontroller)
jobrouter.get("/uploads/:id",imagecontroller)
jobrouter.get("/getjobs",showjobs)
jobrouter.get("/getjob/:id",showjob)
jobrouter.delete("/deletejob/:id",requireSignIn, isAdmin,deletejob)
jobrouter.put("/updatejob/:id",requireSignIn, isAdmin,updatejob)
jobrouter.get("/search/:keyword",searchcontroller)




export default jobrouter
