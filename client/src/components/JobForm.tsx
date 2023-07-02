import React, { useState, ChangeEvent, FormEvent, FC, useEffect } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { userSelector } from "../features/user/userSlice";
import FileUpload from "./FileUpload";
import { getUserByCookie } from "../features/user/userAPI";
import {
  Box,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  TextField,
  FormControlLabel,
  Stack,
  Button,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useNavigate } from "react-router-dom";

interface FormData {
  company_name: string;
  company_description: string;
  title: string;
  title_description: string;
  jobField: string;
  connection: string;
  date_CV_sent: string | null;
  date_interview: string | null;
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
    date_CV_sent: null,
    date_interview: null,
    notes: "",
    cv: null,
  });
  const [fileId, setFileId] = useState<string>("");
  const dispatch = useAppDispatch();
  const width = "60%";
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getUserByCookie());
  }, []);

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

  const HandlePickDateCV = (newDate: string | null) => {
    if (newDate === null) {
      setFormData({ ...formData, date_CV_sent: "" });
    } else {
      setFormData({ ...formData, date_CV_sent: newDate });
    }
  };
  const HandlePickDateIV = (newDate: string | null) => {
    if (newDate === null) {
      setFormData({ ...formData, date_interview: "" });
    } else {
      setFormData({ ...formData, date_interview: newDate });
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const userId = user?._id;
    if (!userId) {
      console.error("no userId");
      return;
    }
    const url = `/api/jobs/${userId}`;

    if (type === "add") {
      try {
        await axios.post(url, { formData, fileId });
        // Handle successful submission
        console.log("Form submitted successfully");
        navigate("/home")
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
    <Stack spacing={3}>
      {/* {type === "add" ? <FileUpload setFileId={setFileId} /> : null} */}
      <form onSubmit={handleSubmit}>
        {/* <FormControl> */}
        <Stack spacing={3}>
          <Box sx={{ width }}>
            {/* <InputLabel htmlFor="company_name">Company Name</InputLabel> */}
            <TextField
              name="company_name"
              label="Company Name"
              value={formData.company_name}
              onChange={handleChange}
              disabled={archivedJob}
              fullWidth
            />
          </Box>

          <Box sx={{ width }}>
            <TextField
              label="Company Description"
              name="company_description"
              value={formData.company_description}
              onChange={handleChange}
              disabled={archivedJob}
              multiline
              rows={3}
              fullWidth
            />
            <FormHelperText id="my-helper-text">
              Feel free to paste the company descripton or write your own
            </FormHelperText>
          </Box>
          <Box sx={{ width }}>
            <TextField
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              disabled={archivedJob}
              label="Title"
              fullWidth
            />
          </Box>
          <Box sx={{ width }}>
            <TextField
              name="title_description"
              value={formData.title_description}
              onChange={handleChange}
              disabled={archivedJob}
              label="Title Description"
              multiline
              minRows={3}
              fullWidth
            />
            <FormHelperText id="my-helper-text">
              Feel free to paste the title descripton or write your own
            </FormHelperText>
          </Box>
          <Box sx={{ width }}>
            <TextField
              type="text"
              name="jobField"
              value={formData.jobField}
              onChange={handleChange}
              disabled={archivedJob}
              label="Job Field"
              fullWidth
            />
          </Box>
          <Box sx={{ width }}>
            <TextField
              type="text"
              name="connection"
              value={formData.connection}
              onChange={handleChange}
              disabled={archivedJob}
              label="Connection"
              fullWidth
            />
            <FormHelperText id="my-helper-text">
              The Person that refered you or you submitted through
            </FormHelperText>
          </Box>
          <Box sx={{ width }}>
            <DatePicker
              label="Date CV Sent"
              value={formData.date_CV_sent}
              onChange={(newDate) => HandlePickDateCV(newDate)}
              disabled={archivedJob}
            />
          </Box>
          <Box sx={{ width }}>
            <DatePicker
              label="Date Interview"
              value={formData.date_interview}
              onChange={(newDate) => HandlePickDateIV(newDate)}
              disabled={archivedJob}
            />
          </Box>
          <Box sx={{ width }}>
            <TextField
              type="text"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              disabled={archivedJob}
              label="Notes"
              multiline
              minRows={3}
              fullWidth
            />
            <FormHelperText id="my-helper-text">
              Write anything you wish
            </FormHelperText>
          </Box>
          <Box sx={{ width }}>
            <Button variant="contained" type="submit" disabled={archivedJob}>
              Submit
            </Button>
          </Box>
        </Stack>


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
    </Stack>
  );
};

export default JobForm;
