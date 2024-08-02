import express from "express";
import { appliedjobs ,getappliedjobs} from "../controller/jobcontroller.js"
import { isAdmin, requireSignIn } from "../middleware/authmiddleware.js";
import jwt from "jsonwebtoken";
const jobrouter=express.Router()
jobrouter.post('/apply/:id',requireSignIn,appliedjobs)
jobrouter.get('/apply/:userId',getappliedjobs)

export default jobrouter