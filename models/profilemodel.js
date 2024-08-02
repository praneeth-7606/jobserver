import mongoose from "mongoose"

const profileSchema  =new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
      },
    Education:{
        type:String,
        required:true,
    },
    Gender:{
        type:String,
        required:true,
        
    },
    AadhaarNo:{
        type:String,
        required:true
    },
    State :{
        type:String,
        
    },
    country: {
        type: String,
        default: 0,
      },
      passportnumber: {
        type: String,
        default: 0,
      },
  
    phonenumber:{
        type:Number
    },
    Age:{
        type:Number
    }
},{timestamps:true})
export default  mongoose.model("profile",profileSchema)