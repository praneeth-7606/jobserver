import jobtypemodel from "../models/jobtypemodel.js";
import slugify from 'slugify';


export const createtypecontroller=async(req,res)=>{
    const { name} = req.body;
    if (!name) {
        return res.status(401).send({ message: "Name is required" });
      }
    try{
        // Check if the job type already exists
        const existingJobType = await jobtypemodel.findOne({ name });

        if (existingJobType) {
            return res.status(400).json({ success: false, message: 'Job type already exists' });
        }
       

        // Create a new job type
        const newJobType = new jobtypemodel({ name, slug:slugify(name) });

        // Save the new job type to the database
        await newJobType.save();

        res.status(201).json({ success: true, message: 'Job type created successfully', jobType: newJobType });

    }catch(err){
        console.log(err)
        res.status(500).send({
            success: false,
            message: "Error in creating the jobtype",
            err,
        });

    }

}
// getall types
export const jobtypecontroller=async(req,res)=>{
    try{
    const category = await jobtypemodel.find({});
    res.status(200).send({
      success: true,
      message: "All Categories List",
      category,
    });

    }catch(err){
        console.log(err)
        res.status(500).send({
            success: false,
            message: "Error in getting the jobtype",
            err,
        });

    }

}
// update type
export const updatetypecontroller=async(req,res)=>{
    const { id } = req.params; // Assuming id is taken from the URL parameters
    const { name } = req.body;
    try{
        const existingJobType = await jobtypemodel.findByIdAndUpdate(id,{ name, slug: slugify(name) },
        { new: true });

        if (!existingJobType) {
            return res.status(404).json({ success: false, message: 'Job type not found' });
        }

        // Update the job type fields
        // existingJobType.name = name;
        // existingJobType.slug = slug;

        // Save the updated job type to the database
        await existingJobType.save();

        res.status(200).json({ success: true, message: 'Job type updated successfully', jobType: existingJobType });
    }catch(err){
        console.log(err)
        res.status(500).send({
            success: false,
            message: "Error in updataing the jobtype",
            err,
        });

    }

}

// deletetypeController


export const deletetypeController=async(req,res)=>{
    try{
        const { id } = req.params;
    await jobtypemodel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Jobtitle  Deleted Successfully",
    });

    }catch(err){
        console.log(err)
        res.status(500).send({
            success: false,
            message: "Error in deleting the jobtype",
            err,
        });

    }

}