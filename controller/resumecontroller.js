// // controllers/resumeController.js

// // const Resume = require('../models/Resume');
// // import resumemodel from "./res"
// // import resume from "../models/resumemodel.js";
// // controller/resumeController.js
// import Resume from '../models/resumemodel.js';

// export const uploadResume = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).send('No file uploaded.');
//     }

//     const { filename, path, email } = req.file;

//     // Check if a resume already exists for the provided email
//     const existingResume = await Resume.findOne({ email });

//     if (existingResume) {
//       return res.status(400).send('A resume already exists for this email address.');
//     }

//     const newResume = new Resume({
//       email,
//       filename: filename,
//       path: path,
//     });

//     await newResume.save();

//     res.send('Resume uploaded successfully!');
//   } catch (error) {
//     console.error('Error uploading resume:', error);
//     res.status(500).send('Internal Server Error');
//   }
// };
// controllers/resumeController.js
import Resume from '../models/resumemodel.js';

export const uploadResume = async (req, res) => {
  try {
    if (!req.file || !req.body.email) {
      return res.status(400).send('Both resume file and email are required.');
    }

    const { filename, path,  } = req.file;
    const {email}=req.body

    // Check if a resume already exists for the provided email
    const existingResume = await Resume.findOne({ email });

    if (existingResume) {
      return res.status(400).send('A resume already exists for this email address.');
    }

    const newResume = new Resume({
      email,
      filename: filename,
      path: path,
    });

    await newResume.save();

    res.send('Resume uploaded successfully!');
  } catch (error) {
    console.error('Error uploading resume:', error);
    res.status(500).send('Internal Server Error');
  }
};

export const getResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.set('Content-Type', resume.contentType);
    res.set('Content-Disposition', `attachment; filename="${resume.filename}"`);
    res.send(resume.data);
  } catch (error) {
    console.error('Error fetching resume:', error);
    res.status(500).json({ message: 'Internal server error' });
  }

}



