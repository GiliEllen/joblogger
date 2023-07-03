import express from "express";
import {
  addJob,
  toggleArchiveJob,
  getAllJobsByUserId,
  getJobByID,
  deleteJobById,
  updateStatus,
  updateJob
} from "./jobsCtrl";

const router = express.Router();

router
  .post("/:userId", addJob)

  .get("/user/:userId", getAllJobsByUserId)

  .get("/job/:jobId", getJobByID)
  .put("/job/:jobId", toggleArchiveJob)
  .patch("/job/:jobId", updateStatus)
  .patch("/job/:jobId/update-job", updateJob)
  .delete("/job/:jobId", deleteJobById);

export default router;
