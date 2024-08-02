import express from "express";
import {registercontroller,loginController,testController,forgotpasswordcontroller} from "../controller/authcontroller.js"
import { isAdmin, requireSignIn } from "../middleware/authmiddleware.js";
import passport from "passport";
const router=express.Router()
router.post("/register",registercontroller)

//LOGIN || POST
router.post("/login", loginController);

//test routes
router.get("/test", requireSignIn, isAdmin, testController);



//forgot password 
router.post("/forgot",forgotpasswordcontroller)
//protected route-auth
router.get("/user-auth",requireSignIn,(req,res)=>{
    res.status(200).send({ok:true})
})


router.get("/user-admin",requireSignIn, isAdmin ,(req,res)=>{
    res.status(200).send({ok:true})
})


router.get("/api/logout", (req, res) => {
  req.logout();
  res.send(req.user);
});


router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/auth/google/callback',
  passport.authenticate('google', { 
    failureRedirect: '/',
    successRedirect:"/auth/google/success"
 }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/profile');
  }
);

export default router
