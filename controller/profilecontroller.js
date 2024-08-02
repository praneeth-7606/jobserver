
// import Profile from "./"
import Profile from "../models/profilemodel.js";

export const addcontroller=async(req,res)=>{
  try {
    const existingProfile = await Profile.findOne({ user: req.user._id });
        if (existingProfile) {
            return res.status(400).json({ message: "User already has a profile" });
        }
    const profile = new Profile({
        ...req.body,
        user: req.user._id // Assigning the user's ID to the profile
    });
    await profile.save();
    res.status(201).json({ message: 'Profile details added successfully' });
} catch (error) {
    res.status(500).json({ error: error.message });
}
}

export const updatecontroller=async(req,res)=>{
  try {
    const { id } = req.params;
    const updatedProfile = await Profile.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedProfile) {
        return res.status(404).json({ message: 'Profile not found' });
    }
    res.status(200).json({ message: 'Profile details updated successfully', profile: updatedProfile });
} catch (error) {
    res.status(500).json({ error: error.message });
}
    
}



export const getProfileByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log("User ID:", userId);
    
    const profile = await Profile.findOne({ user: userId });
    console.log("Found Profile:", profile);

    if (!profile) {
      return res.status(404).json({ message: "Profile not found for the user" });
    }
    res.status(200).json({ profile });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
};



export const getidcontroller=async(req,res)=>{
    try {
        const { id } = req.params;
        const profile = await Profile.findById(id);
        if (!profile) {
          return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(200).json({ profile });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    
}