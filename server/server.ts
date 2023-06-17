import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
// import methodOverride from "method-"
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import path from "path";
const crypto = require("crypto");
const Grid = require("gridfs-stream");

const app = express();

dotenv.config();

const mongodb_uri = process.env.MONGO_URI;
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

// const conn = mongoose.createConnection(mongodb_uri);

let gfs;

mongoose.set("strictQuery", true);

mongoose
  .connect(mongodb_uri)
  .then((res) => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("At mongoose.connect:");
    console.error(err.message);
  });

const conn = mongoose.connection;

conn.once("open", () => {
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "cvfiles",
  });
});

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

function checkFileType(file, cb) {
  const fileTypes = /doc|docx|pdf/
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = fileTypes.test(file.mimetype);
  if(mimetype && extname) return cb(null, true)
  cb('filetype')
}

const uploadMiddleware = (req, res, next) => {
  const upload = store.single("file");
  upload(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).send({error: 'file to large'})
    } else if (err) {
      if (err === 'filetype') return res.status(400).send("Only doc, docx, pdf is expeccted.")
      return res.sendStatus(500)
    }
    next()
  })
}

app.post("/upload", uploadMiddleware, async (req, res) => {
  // console.log(req.file);
  // console.log(req.body);
  // res.send({ file: "file" });
  const {file} = req;
  //@ts-ignore
  if(file.size > 20000000) {
    // deleteFile(id);
    return res.status(400).send({error: "file may not exceed 20mb"})
  }
  console.log("uploaded file: " , file)
  return res.send({file})
});

import usersRoutes from "./API/users/usersRoutes";
app.use("/api/users", usersRoutes);

import jobsRoutes from "./API/jobs/jobsRoutes";
app.use("/api/jobs", jobsRoutes);

app.listen(PORT, () => {
  console.log(`server is active on port : ${PORT}`);
});
