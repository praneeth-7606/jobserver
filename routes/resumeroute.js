// routes/resumeRoutes.js
import {getResume, uploadResume} from "../controller/resumecontroller.js"
import { isAdmin,requireSignIn } from "../middleware/authmiddleware.js";
// const express = require('express');
import express from "express"
import multer from "multer"
const router = express.Router();

// const resumeController = require('../controllers/resumeController');

const upload = multer({ dest: 'uploads/' });
router.get('/resume/:id',getResume)
router.post('/upload',requireSignIn, upload.single('resume'), uploadResume);

export default router
