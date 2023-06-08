import express from "express";
import { addJob, getAllJobsByUserId } from "./jobsCtrl";

const router = express.Router();

router
  .post("/:userId", addJob)
  .get("/:userId", getAllJobsByUserId)


export default router;
