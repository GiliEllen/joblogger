import express from "express";
import { saveFileToUser, uploadMiddleware, uploader } from "./cvCtrl";

const router = express.Router();

router.post("/upload", uploadMiddleware, uploader, saveFileToUser);

export default router;
