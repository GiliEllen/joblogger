import mongoose from "mongoose";

const CVFilesSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  fileId: String,
  fileName: String,
  fileDescription: String
});

const CvModel = mongoose.model("cvfiles", CVFilesSchema);

export default CvModel;

