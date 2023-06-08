import express from "express";
import { addJob } from "./jobsCtrl";

const router = express.Router();

router
  .post("/:userId", addJob)


export default router;
