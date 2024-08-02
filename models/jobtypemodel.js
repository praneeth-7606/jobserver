import mongoose from "mongoose"

const jobttypeschmea=new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
      },
      slug: {
        type: String,
        lowercase: true,
      },


})

export default mongoose.model("Jobtype", jobttypeschmea);