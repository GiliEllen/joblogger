import express from "express";
import {
  downloadResume,
  saveFileToUser,
  uploadMiddleware,
  uploader,
} from "./cvCtrl";

const router = express.Router();

router
  .get("/download/:filename", downloadResume)
  .post("/upload", uploadMiddleware, uploader, saveFileToUser);

export default router;
