import mongoose from "mongoose";
import JobModel from "./jobsModel";
import CvModel from "../cvFiles/cvfilesModel";

export async function addJob(req, res) {
  try {
    const { formData, fileId } = req.body;

    const {
      company_name,
      company_description,
      title,
      title_description,
      jobField,
      connection,
      date_CV_sent,
      date_interview,
      notes,
      cv,
    } = formData;
    const { userId } = req.params;
    if (!userId)
      throw new Error(
        "Missing inforamtion from client on addJob in jobCtrl.ts"
      );

    const jobDB = new JobModel({
      userId,
      company_name,
      company_description,
      title,
      title_description,
      jobField,
      connection,
      date_CV_sent,
      date_interview: null,
      notes,
      cv: fileId,
      archive: false,
      status: "Applied",
    });
    await jobDB.save();

    res.send({ job: true, jobDB });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

export async function getAllJobsByUserId(req, res) {
  try {
    const { userId } = req.params;

    const jobsArrayDB = await JobModel.find({ userId });
    JobModel.find({ userId })
      .then((jobsDB) => {
        const cvFiles = [];

        jobsDB.forEach((job) => {
          cvFiles.push(CvModel.find({ fileId: job.cv }));
        });
        return Promise.all(cvFiles);
      })
      .then((listOfFiles) => {
        const results = [];

        for (var i = 0; i < listOfFiles.length; i++) {
          results.push({
            job: jobsArrayDB[i],
            cvFile: listOfFiles[i],
          });
        }

        res.send({ jobsDB: results });
      });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

export async function getJobByID(req, res) {
  try {
    const { jobId } = req.params;
    if (!jobId)
      throw new Error("no jobId from params on getJobById in jobsCtrl");

    const jobDB = await JobModel.findById(jobId);
    if (!jobDB || jobDB.title.length == 0) {
      res.send({ jobDB: "no job" });
    } else {
      res.send({ jobDB });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}
export async function toggleArchiveJob(req, res) {
  try {
    const { jobId } = req.params;
    if (!jobId)
      throw new Error("no jobId from params on getJobById in jobsCtrl");

    const jobDB = await JobModel.findById(jobId);
    if (!jobDB || jobDB.title.length == 0) {
      res.send({ jobDB: "no job" });
    }
    jobDB.archive = !jobDB.archive;
    await jobDB.save();
    if (jobDB.archive) {
      res.send({ archive: true });
    } else {
      res.send({ archive: false });
    }
  } catch (error) {
    res.status(500).send({ error: error.message, archive: false });
  }
}

export async function deleteJobById(req, res) {
  try {
    const { jobId } = req.params;
    if (!jobId)
      throw new Error("no jobId from params on getJobById in jobsCtrl");
    const result = await JobModel.findByIdAndDelete(jobId);

    res.send({ result });
  } catch (error) {
    res.status(500).send({ error: error.message, archive: false });
  }
}

export async function updateStatus(req, res) {
  try {
    const { jobId } = req.params;
    if (!jobId)
      throw new Error("no jobId found on params in updateStatus in JobsCtrl");
    const { status } = req.body;
    if (!status)
      throw new Error("no status found on body in updateStatus in JobsCtrl");
    const jobDB = await JobModel.findByIdAndUpdate(
      jobId,
      { status: status },
      {
        new: true,
      }
    );
    res.send({ jobDB, ok: true });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}
export async function updateJob(req, res) {
  try {
    const { jobId } = req.params;
    if (!jobId)
      throw new Error("no jobId found on params in updateStatus in JobsCtrl");
    const { formData } = req.body;
    if (!formData)
      throw new Error("no formData found on body in updateStatus in JobsCtrl");
    const jobDB = await JobModel.findById(jobId)
    if (!jobDB) throw new Error("no job found in updateStatus in JobsCtrl")
    const keysToUpdate = Object.keys(formData)
    const valuesToUpdate = Object.values(formData)

    await keysToUpdate.forEach(async (key, idx) => {
      jobDB[key] = valuesToUpdate[idx]
    })
    await jobDB.save()
    

    res.send({ jobDB, ok: true });
    // res.send({test: true, jobDB})
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}
