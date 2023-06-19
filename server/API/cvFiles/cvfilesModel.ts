import mongoose from "mongoose";

const CVFilesSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  fileId: String,
  fileName: String,
  fileDescription: String,
  fileInfo: mongoose.Schema.Types.Mixed
});

const CvModel = mongoose.model("cvfiles", CVFilesSchema);

export default CvModel;

