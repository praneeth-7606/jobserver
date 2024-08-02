import mongoose from "mongoose";
const jobschema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    filename: {
        type:String
    },
    path:{
        type:String  
      },
    //   name:String,
    //   data:Buffer,
    //   contentType:String,
    company:{
        type:String,
        required:true
    },
    jobtype:{
        type:String,
        required:true
    },
    description: { 
    type: String, 
    required: true
 },
 role:{
    type:String,
    required:true
},
    location: { 
        type: String, 
         },
    salary: { 
        type: String
     },
     experienceLevel: { type: String },
     educationLevel: { type: String },
    skills: [{ type: String }],

    datePosted: { type: Date, default: Date.now },
    applicationDeadline: { type: Date,
        required:true,
        default: function() {
            // Calculate 15 days from the current date
            const currentDate = new Date();
            const deadline = new Date(currentDate);
            deadline.setDate(currentDate.getDate() + 15);
            return deadline;
        }
     },
// title: { type: String, required: true },
// company: { type: String, required: true },
// description: { type: String, required: true },
// location: { type: String, required: true },
// salary: { type: Number },
// employmentType: { type: String },
// experienceLevel: { type: String },
// educationLevel: { type: String },
// skills: [{ type: String }],
// datePosted: { type: Date, default: Date.now },
// applicationDeadline: { type: Date },
// contactInformation: { type: String },
// category: { type: String },
// status: { type: String, default: 'open' },
// additionalInformation: { type: String }

})
export default  mongoose.model("jobs",jobschema)