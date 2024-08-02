import express from "express";
import {addcontroller,updatecontroller,getProfileByUserId,getidcontroller} from "../controller/profilecontroller.js"
// import 
import { isAdmin, requireSignIn } from "../middleware/authmiddleware.js";
const router=express.Router()
// add details
router.post("/addprofile",requireSignIn,addcontroller)

//update details by id
router.put("/profiles/:id",requireSignIn, updatecontroller);

//get all profiles
router.get("/getprofiles/:userId",requireSignIn, getProfileByUserId);
// get profiles by id 
router.get("/getprofiles/:id",requireSignIn, getidcontroller);
export default router
