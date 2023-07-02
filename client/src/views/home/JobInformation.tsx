import React, { useEffect, useState } from "react";
import { Button, Container, Paper, Typography, Box } from "@mui/material";
import DrawerMenue from "../../components/DrawerMenue";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAppSelector } from "../../app/hooks";
import { userSelector } from "../../features/user/userSlice";
import JobForm from "../../components/JobForm";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArchiveIcon from "@mui/icons-material/Archive";

const JobInformation = () => {
  const [job, setJob] = useState<any>({});
  const { jobId } = useParams();

  const handleGetJobInformation = async () => {
    try {
      const { data } = await axios.get(`/api/jobs/job/${jobId}`);
      const { jobDB, error } = data;
      if (error) throw error;
      setJob(jobDB);
      console.log(job);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    handleGetJobInformation();
  }, []);

  const [visibleEdit, setVisibleEdit] = useState<boolean>(false);
  const [visibleConsent, setVisibleConsent] = useState<boolean>(false);
  const [deleteConsent, setDeleteConsent] = useState<string>("");
  const [archivedJob, setArchivedJob] = useState<boolean>();

  const user = useAppSelector(userSelector);

  const handleGetConsent = () => {
    setVisibleConsent(!visibleConsent);
  };

  const handleDeleteJob = async (jobId: string) => {
    try {
      console.log(deleteConsent);
      if (deleteConsent === "Yes") {
        const { data } = await axios.delete(`/api/jobs/job/${jobId}`);
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleArchive = async (jobId: string) => {
    try {
      if (user) {
        const userId = user?._id;
        const { data } = await axios.put(`/api/jobs/job/${jobId}`);
        console.log(data);
        setArchivedJob(data.archive);
        if (data.archive) {
          console.log("archived successfully");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <DrawerMenue />

      <Container>
        <Paper>
          <Container>
            <Typography variant="h3">{job.title}</Typography>
            <Typography variant="h5">at {job.company_name}</Typography>
            <Typography>{job.company_description}</Typography>
            <Typography variant="h5">My description of th job:</Typography>
            <Typography>{job.title_description}</Typography>
            <Typography variant="h5">through?</Typography>
            <Typography>{job.connection}</Typography>
            <Typography variant="h5">CV sent on:</Typography>
            <Typography>{job.date_CV_sent}</Typography>
            <Typography variant="h5">notes</Typography>
            <Typography>{job.notes}</Typography>
            <Typography variant="h5">Cv file</Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "60%",
              }}
            >
              <Button
                startIcon={<EditIcon />}
                variant="contained"
                onClick={() => setVisibleEdit(!visibleEdit)}
              >
                Edit Job
              </Button>
              <Button
                startIcon={<DeleteIcon />}
                variant="contained"
                color="secondary"
                onClick={() => handleGetConsent()}
              >
                Delete
              </Button>
              <Button
                startIcon={<ArchiveIcon />}
                variant="contained"
                color="secondary"
                onClick={() => handleArchive(job._id)}
              >
                Archive
              </Button>
            </Box>

            {visibleEdit ? (
              <Container sx={{my: 5}}>
                <JobForm
                  type="edit"
                  jobId={job._id}
                  archivedJob={archivedJob}
                  setArchivedJob={setArchivedJob}
                />
              </Container>
            ) : null}
            {visibleConsent ? (
              <div>
                <h5>Are you sure you want to delete this job?</h5>
                <p>This action is not permennt</p>
                <p>
                  If you are sure, please write "Yes" below, then click the
                  button
                </p>
                <input
                  type="text"
                  value={deleteConsent}
                  onInput={(ev: any) => setDeleteConsent(ev.target.value)}
                />
                <button
                  onClick={() => {
                    handleDeleteJob(job._id);
                  }}
                  disabled={deleteConsent === "Yes" ? false : true}
                >
                  DELETE
                </button>
              </div>
            ) : null}
          </Container>
        </Paper>
      </Container>
    </>
  );
};

export default JobInformation;
