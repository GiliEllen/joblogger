import { boolean } from "joi";
import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  company_name: String,
  company_description: String,
  title: String,
  title_description: String,
  jobField: String,
  connection: String,
  date_CV_sent: Date,
  date_interview: Array<Date>,
  notes: String,
  status: {
    type:String,
    enum: ['In Progress', 'Denied', 'CV', 'interviewing', 'hired']
  },
  cv: String,
  archive: Boolean
});

const JobModel = mongoose.model("jobs", JobSchema);

export default JobModel;

