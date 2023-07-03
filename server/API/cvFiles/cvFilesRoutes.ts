import express from "express";
import {
  downloadFileById,
  saveFileToUser,
  uploadMiddleware,
  uploader,
} from "./cvCtrl";

const router = express.Router();

router
  .post("/upload", uploadMiddleware, uploader, saveFileToUser)
  .get("/download/:id", downloadFileById);

export default router;
