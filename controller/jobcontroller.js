import jobmodel from "../models/jobmodel.js"
import AppliedJob from "../models/appliedjob.js"
import usermodel from "../models/usermodel.js"
// import job
import mongoose from "mongoose"
import { isAdmin ,requireSignIn} from "../middleware/authmiddleware.js"
import jwt from "jsonwebtoken";
import fs from "fs"
import multer from "multer"
import path from "path"



// const upload = multer({ dest: 'uploads/' });
  export const addjobcontroller =  async (req, res) => {
    try{
      if (!req.file ) {
        return res.status(400).send('Both resume file and email are required.');
      }
  
      const { filename, path,  } = req.file;

    // const { photo } = req.files;
      const{title,company,jobtype,description,role,salary,applicationDeadline,skills,educationLevel,experienceLevel,location}=req.body
        // const photo = req.file;
        // const skillsArray = req.body.skills.split(',');
        if(!title){
            return res.status(404).json({message:"job title is required"})
        }
        if(!company){
            return res.status(404).json({message:"company which posting this job is required"})
        }
        if(!jobtype){
            return res.status(404).json({message:"job type is required"})
        }
        if(!description){
            return res.status(404).json({message:"job description is required"})
        }
        if(!role){
            return res.status(404).json({message:"job role is required"})
        }

      
        const exisitingjob = await jobmodel.findOne({ role,company,jobtype });
       
        if (exisitingjob) {
            return res.status(200).send({
              success: false,
              message: "This job is already added",
            });
          }
          const job =  new jobmodel({
            title,company,jobtype,description,role,salary,applicationDeadline,skills,experienceLevel,educationLevel,location,filename:filename,path:path 
          })
          // if(photo){
          //   job.photo.data=fs.readFileSync(photo.path)
          //   job.photo.contentType=photo.type
          // }
          await job.save();
          // fs.unlinkSync(photo.path);
          // fs.unlinkSync(req.file.path);
          res.status(201).send({
            success: true,
            message: "New job Created  Successfully",
            job,
          });

    }catch(err){
        console.log(err)
        res.status(500).send({
            success: false,
            message: "Error in creating the job",
            err,
        });
    }

}

export const imagecontroller=async(req,res)=>{
    try {
        const { id } = req.params;
        // Construct the path to the image file based on the provided ID
        const imagePath = path.join(__dirname, 'uploads', id);
      
        // Set the appropriate content type for serving images
        res.setHeader('Content-Type', 'image/png'); // Adjust the content type based on your image format
      
        // Send the image file as the response
        res.sendFile(imagePath);// Assuming 'path' is the field where image data is stored
          } catch (error) {
            console.error('Error fetching image:', error);
            res.status(500).json({ message: 'Internal server error' });
          }
          
    }





// export const addjobcontroller = async (req, res) => {
//     try {
//       const {
//         title,
//         company,
//         jobtype,
//         description,
//         role,
//         salary,
//         applicationDeadline,
//         skills,
//         educationLevel,
//         experienceLevel,
//         location
//       } = req.body;
  
//       // Check if photo is included in the request
//       if (!req.file) {
//         return res.status(400).json({
//           success: false,
//           message: "Photo is required"
//         });
//       }
  
//       const photoData = {
//         data: fs.readFileSync(req.file.path),
//         contentType: req.file.mimetype
//       };
  
//       // Validate other job details
//       if (!title || !company || !jobtype || !description || !role) {
//         return res.status(400).json({
//           success: false,
//           message: "All fields are required"
//         });
//       }
  
//       const existingJob = await jobmodel.findOne({
//         role,
//         company,
//         jobtype
//       });
//       if (existingJob) {
//         return res.status(200).json({
//           success: false,
//           message: "This job is already added"
//         });
//       }
  
//       const newJob = await new jobmodel({
//         title,
//         company,
//         jobtype,
//         description,
//         role,
//         salary,
//         applicationDeadline,
//         skills,
//         experienceLevel,
//         educationLevel,
//         location,
//         photo: photoData
//       }).save();
  
//       // Remove the uploaded photo from the server after saving to the database
//       fs.unlinkSync(req.file.path);
  
//       return res.status(201).json({
//         success: true,
//         message: "New job created successfully",
//         job: newJob
//       });
  
//     } catch (err) {
//       console.error(err);
//       return res.status(500).json({
//         success: false,
//         message: "Error in creating the job",
//         error: err
//       });
//     }
//   };
export const showjobs=async(req,res)=>{
    try {
        let query = jobmodel.find();
    
        // Apply filters if provided
        if (req.query.jobType) {
          query = query.where('jobtype').equals(req.query.jobType);
        }
        if (req.query.company) {
          query = query.where('company').regex(new RegExp(req.query.company, 'i'));
        }
        if (req.query.location) {
            query = query.where('location').regex(new RegExp(req.query.location, 'i'));
        }
        const jobs = await query.exec();
        res.json(jobs);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }

}
export const showjob=async(req,res)=>{
    const jobId = req.params.id;
    try{
        // const jobs = await Job.find();
        const jobs = await jobmodel.findById(jobId);
        res.json(jobs);


    }catch(err){
        console.log(err)
        res.status(500).send({success:false,message:"something went wrong while displaying the data",err})

    }

}


export const deletejob=async(req,res)=>{
    const jobId = req.params.id;
    try{
    
        const jobs = await jobmodel.findByIdAndDelete(jobId);
        res.status(201).json({message:"sucessfully  given job is deleted"})

    }catch(err){
        console.log(err)
        res.status(500).send({success:false,message:"something went wrong while deleting the data",err})

    }

}

export const updatejob = async(req,res)=>{
    const jobId = req.params.id;
    try{
        // const{role}=req.body
        // const{title,company,jobtype,description,role,salary,applicationDeadline}=req.body
        const updatedJob = await jobmodel.findByIdAndUpdate(jobId, req.body, { new: true });

        // Check if the job was found and updated
        if (!updatedJob) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(201).json({message:"given job was update"});


    }catch(err){
        console.log(err)
        res.status(500).json({success:false,message:"something went wrong while updating the data",err})

    }
}



export const searchcontroller=async(req,res)=>{
    try{
        const {keyword}=req.params
        const results = await jobmodel.find({
            $or:[
                {title:{$regex:keyword,$options:"i"}},
                {description:{$regex:keyword,$options:"i"}},
                {company:{$regex:keyword,$options:"i"}},
                {role:{$regex:keyword,$options:"i"}}
            ]

        }).select("-photo")
        res.json(results)

    }catch(err){
        console.log(err)
        res.status(500).send({success:false,message:"error in serach the job",})
        err

    }

}


export const relatedjobcontroller=async(req,res)=>{
    try{
        const {pid,cid}=req.params
        const jobs= await jobmodel.find({
            jobtype:cid,
            _id:{$ne:pid}
    
        }).select("-photo").limit(4).populate("jobtype")
        res.status(200).send({
            success:true,
            jobs
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({success,message:"error in showing related jobs"})

    }
}


// export const appliedjobs=async(req,res)=>{

//     try {
//         const jobId = req.params.id;
// //         const token = req.headers.authorization.split(' ')[1];
// // const decoded = jwt.verify(token, 12345678);
// // const userId = decoded.userId;

//         const userId = req.body.userId; // Assuming you have user authentication middleware
    
//         // Check if the user has already applied for this job
//         const existingApplication = await AppliedJob.findOne({ jobId, userId });
//         if (existingApplication) {
//           return res.status(400).json({ message: 'You have already applied for this job' });
//         }
    
//         // Save the job application in your database
//         const newAppliedJob = new AppliedJob({ jobId, userId });
//         await newAppliedJob.save();
    
//         res.status(200).json({ message: 'Application submitted successfully' });
//       } catch (error) {
//         console.error('Error applying for job:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//       }
// }
export const appliedjobs=async(req,res)=>{

    try {
        const { jobId, userId } = req.body;

        const existingApplication = await AppliedJob.findOne({ jobId, userId });
        if (existingApplication) {
          return res.status(400).json({ message: 'You have already applied for this job' });
        }
        const newAppliedJob = new AppliedJob({ jobId, userId });
        await newAppliedJob.save();
        res.status(200).json({ message: 'Application submitted successfully' });
      } catch (error) {
        console.error('Error applying for job:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
}

export const getappliedjobs=async(req,res)=>{
    try{
        const userId = req.params.userId;
        // console.log({userId})
    const appliedJobs = await AppliedJob.find({ userId }).populate(`jobId`);
    res.status(201).send({appliedJobs});

    }catch(err){
        console.log(err)
        res.status(500).json({ message: 'error in displaying the applied jobs',err });

    }
}