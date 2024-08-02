import express from "express";
import { isAdmin, requireSignIn } from "./../middleware/authmiddleware.js";
import { createtypecontroller,jobtypecontroller,updatetypecontroller,deletetypeController } from "../controller/jobtypecontroller.js";
const jobtrouter = express.Router();


jobtrouter.post(
    "/createjobtype",
    requireSignIn,
    isAdmin,
    createtypecontroller
  );
  
  //update category
  jobtrouter.put(
    "/update-jobtype/:id",
    requireSignIn,
    isAdmin,
    updatetypecontroller
  );
  
  //getALl category
  jobtrouter.get("/get-jobtype", jobtypecontroller);
  
  //single category
//   router.get("/single-category/:slug", singletypeController);
  
  //delete category
  jobtrouter.delete(
    "/delete-jobtype/:id",
    requireSignIn,
    isAdmin,
    deletetypeController
  );


export default jobtrouter
