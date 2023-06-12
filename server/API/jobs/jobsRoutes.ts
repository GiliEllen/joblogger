import express from "express";
import { addJob, toggleArchiveJob, getAllJobsByUserId, getJobByID, deleteJobById } from "./jobsCtrl";

const router = express.Router();

router
  .post("/:userId", addJob)

  .get("/user/:userId", getAllJobsByUserId)

  .get("/job/:jobId", getJobByID)
  .put("/job/:jobId", toggleArchiveJob)
  .delete("/job/:jobId", deleteJobById);

export default router;
