import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
// import methodOverride from "method-"


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


import cvfilesRoutes from "./API/cvFiles/cvFilesRoutes";
app.use("/api/cv", cvfilesRoutes)

import usersRoutes from "./API/users/usersRoutes";
app.use("/api/users", usersRoutes);

import jobsRoutes from "./API/jobs/jobsRoutes";
app.use("/api/jobs", jobsRoutes);

app.listen(PORT, () => {
  console.log(`server is active on port : ${PORT}`);
});
