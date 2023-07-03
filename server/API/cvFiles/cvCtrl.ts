import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import path from "path";
import CvModel from "./cvfilesModel";
import express from 'express';

import mongoose from "mongoose";
const crypto = require("crypto");
const Grid = require("gridfs-stream");

import  {gridfsBucket, gfs}  from "../../server";

const mongodb_uri = process.env.MONGO_URI;

export const storage = new GridFsStorage({
  url: mongodb_uri,
  options: {
    useUnifiedTopology: true,
  },
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});
export const store = multer({
  storage,
  limits: { fileSize: 20000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

export function checkFileType(file, cb) {
  const fileTypes = /doc|docx|pdf/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);
  if (mimetype && extname) return cb(null, true);
  cb("filetype");
}

export const uploadMiddleware = (req, res, next) => {
  const upload = store.single("file");
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).send({ error: "file to large" });
    } else if (err) {
      if (err === "filetype")
        return res.status(400).send("Only doc, docx, pdf is expeccted.");
      return res.sendStatus(500);
    }
    next();
  });
};

export async function uploader(req, res, next) {
  const { file } = req;
  if (file.size > 20000000) {
    return res.status(400).send({ error: "file may not exceed 20mb" });
  }
  //   console.log("uploaded file: ", file);
  req.addFile = file;
  next();
}

export async function saveFileToUser(req, res) {
  const { file, addFile } = req;
  const { title, description, userId } = req.body;
  const cvFileDB = new CvModel({
    userId: userId,
    fileId: addFile.id,
    fileDescription: description,
    fileName: title,
  });
  await cvFileDB.save();
  res.send({ file });
}

export const downloadFileById = (fileId: string, res: express.Response) => {
  // const objectId = new mongoose.Types.ObjectId(fileId);

  // gridfsBucket.files.findOne({ _id: objectId }, (err, file) => {
  //   if (err) {
  //     console.log('Error finding file:', err);
  //     return res.status(500).json({ error: 'Server error' });
  //   }

  //   if (!file) {
  //     return res.status(404).json({ error: 'File not found' });
  //   }

  //   const readStream = gridfsBucket.createReadStream({ _id: objectId });
  //   readStream.on('error', (error) => {
  //     console.log('Error reading file:', error);
  //     return res.status(500).json({ error: 'Server error' });
  //   });

  //   res.set('Content-Type', file.contentType);
  //   res.set('Content-Disposition', `attachment; filename="${file.filename}"`);

  //   readStream.pipe(res);
  // });
};

// Example route to download a file
