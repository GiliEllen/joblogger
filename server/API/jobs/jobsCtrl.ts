import mongoose from "mongoose";
import JobModel from "./jobsModel";

export async function addJob(req, res) {
  try {

    const {formData}  =req.body;

    console.log(formData)
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
      cv: null,
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

    const jobsDB = await JobModel.find({ userId });

    res.send({ jobsDB });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}
