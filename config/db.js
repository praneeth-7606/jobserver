// const mongoose= require("mongoose")
import mongoose from "mongoose"
// import colors from "colors"
const database=async()=>{
    try{
        const conn =await mongoose.connect("mongodb://localhost:27017/mylogin");
        console.log(`connected to mongodb database`)
    }catch(error){
        console.log(`error in mongodb ${error}`)

    }
}

export default database