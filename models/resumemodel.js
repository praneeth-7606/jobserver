import mongoose from "mongoose"

const resumeschmea=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unquie:true

    },
      filename:{
        type: String,
      },
      path:{
        type: String,
      }


})

export default mongoose.model("resume", resumeschmea);