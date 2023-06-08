import express from "express";
import { addJob, getAllJobsByUserId, getJobByID } from "./jobsCtrl";

const router = express.Router();

router
  .post("/:userId", addJob)
  .get("/user/:userId", getAllJobsByUserId)
  .get("/job/:jobId", getJobByID)


export default router;
