// models/AppliedJob.js

import mongoose from "mongoose";

const appliedJobSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'jobs' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }
});

export default  mongoose.model('AppliedJob', appliedJobSchema);
