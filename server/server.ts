import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
// import methodOverride from "method"
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";


const app = express();

dotenv.config();

const mongodb_uri = process.env.MONGO_URI;
const PORT = process.env.PORT;

const storage = new GridFsStorage({
  url: mongodb_uri,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      // crypto.getRandomBytes(16, (err, buf) => {
      //   if (err) {
      //     return reject(err)
      //   }
      var splitTest = function (str) {
        return str.split('\\').pop().split('/').pop();
    }
        // const filename = buf.toString('hex') + path.extreme(file.originalName);
        const filename = splitTest(path)
        const fileInfo = {
          filename,
          bucketName: 'uploads'
        }
        resolve(fileInfo)
      // })
    })
  }
})
const upload = multer({storage})


// future implementation
mongoose.set("strictQuery", true);

let gfs

mongoose
  .connect(mongodb_uri)
  .then((res) => {
    console.log("Connected to DB");
    let gfs

  })
  .catch((err) => {
    console.log("At mongoose.connect:");
    console.error(err.message);
  });

  mongoose.connection.on("connected", () => {
    var db = mongoose.connections[0].db;
    const bucket = new mongoose.mongo.GridFSBucket(db, {
      bucketName: "newBucket"
    });
    console.log(bucket);
  });




app.use(express.json());
app.use(cookieParser()); 


import usersRoutes from "./API/users/usersRoutes";
app.use("/api/users", usersRoutes);
import jobsRoutes from "./API/jobs/jobsRoutes";
import path from "path";
import { connect } from "http2";
app.use("/api/jobs", jobsRoutes);

app.listen(PORT, () => {
  console.log(`server is active on port : ${PORT}`);
});
