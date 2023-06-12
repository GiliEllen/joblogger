import express from "express";
import { addJob, toggleArchiveJob, getAllJobsByUserId, getJobByID } from "./jobsCtrl";

const router = express.Router();

router
  .post("/:userId", addJob)

  .get("/user/:userId", getAllJobsByUserId)

  .get("/job/:jobId", getJobByID)
  .put("/job/:jobId", toggleArchiveJob);

export default router;
