import React, { useState, ChangeEvent, FormEvent, FC, useEffect } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { userSelector } from "../features/user/userSlice";
import FileUpload from "./FileUpload";
import { getUserByCookie } from "../features/user/userAPI";

interface FormData {
  company_name: string;
  company_description: string;
  title: string;
  title_description: string;
  jobField: string;
  connection: string;
  date_CV_sent: string;
  date_interview: string;
  notes: string;
  cv: File | null;
}

interface JobFormProps {
  type: "add" | "edit";
  jobId?: string;
  archivedJob?: boolean;
  setArchivedJob?: CallableFunction;
}

const JobForm: FC<JobFormProps> = ({
  type,
  jobId,
  archivedJob,
  setArchivedJob,
}) => {
  const user = useAppSelector(userSelector);
  const [formData, setFormData] = useState<FormData>({
    company_name: "",
    company_description: "",
    title: "",
    title_description: "",
    jobField: "",
    connection: "",
    date_CV_sent: "",
    date_interview: "",
    notes: "",
    cv: null,
  });
  const [fileId, setFileId] = useState<string>("");
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getUserByCookie())
  },[])

  const handleUnarchive = async (jobId: string) => {
    try {
      const { data } = await axios.put(`/api/jobs/job/${jobId}`);
      if (setArchivedJob) {
        setArchivedJob(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    if (name === "cv") {
      //   setFormData({ ...formData, [name]: event.target.files?.[0] || null });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const userId = user?._id;
    if (!userId) {
      console.error("no userId")
      return
    }
    const url = `/api/jobs/${userId}`;

    if (type === "add") {
      try {
        await axios.post(url, { formData, fileId });
        // Handle successful submission
        console.log("Form submitted successfully");
      } catch (error) {
        // Handle error
        console.error("Error submitting form", error);
      }
    } else if (type === "edit") {
      try {
        await axios.patch(url, { formData });
        // Handle successful submission
        console.log("Form editted successfully");
      } catch (error) {
        // Handle error
        console.error("Error editting form", error);
      }
    }
  };

  const handleGetFormInformation = async () => {
    try {
      const { data } = await axios.get(`/api/jobs/job/${jobId}`);
      console.log(data);
      setFormData(data.jobDB);
      if (setArchivedJob) {
        setArchivedJob(data.jobDB.archive);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (type == "edit") {
      handleGetFormInformation();
    }
  }, []);

  return (
    <>
      {type === "add" ? <FileUpload setFileId={setFileId} /> : null}
      <form onSubmit={handleSubmit}>
        <label>
          Company Name:
          <input
            type="text"
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
            disabled={archivedJob}
          />
        </label>
        <label>
          Company Description:
          <textarea
            name="company_description"
            value={formData.company_description}
            onChange={handleChange}
            disabled={archivedJob}
          />
        </label>

        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            disabled={archivedJob}
          />
        </label>

        <label>
          Title Description:
          <textarea
            name="title_description"
            value={formData.title_description}
            onChange={handleChange}
            disabled={archivedJob}
          />
        </label>

        <label>
          Job Field:
          <input
            type="text"
            name="jobField"
            value={formData.jobField}
            onChange={handleChange}
            disabled={archivedJob}
          />
        </label>

        <label>
          Connection:
          <input
            type="text"
            name="connection"
            value={formData.connection}
            onChange={handleChange}
            disabled={archivedJob}
          />
        </label>

        <label>
          Date CV Sent:
          <input
            type="date"
            name="date_CV_sent"
            value={formData.date_CV_sent}
            onChange={handleChange}
            disabled={archivedJob}
          />
        </label>

        <label>
          Date Interview:
          <input
            type="date"
            name="date_interview"
            value={formData.date_interview}
            onChange={handleChange}
            disabled={archivedJob}
          />
        </label>

        <label>
          Notes:
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            disabled={archivedJob}
          />
        </label>

        <label>
          CV:
          <input
            type="file"
            name="cv"
            onChange={handleChange}
            disabled={archivedJob}
          />
        </label>

        <button type="submit" disabled={archivedJob}>
          Submit
        </button>

        {archivedJob ? (
          <>
            <p>
              This job is archived and cannot be changed. would you like to an
              archive it?
            </p>
            <button
              onClick={() => {
                if (jobId) handleUnarchive(jobId);
              }}
            >
              Unarchive
            </button>
          </>
        ) : null}
      </form>
    </>
  );
};

export default JobForm;
