import axios from "axios";
import React, { useEffect, useState } from "react";
import JobItem from "./JobItem";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { userSelector } from "../features/user/userSlice";
import { Job } from "../features/jobs/jobModel";
import { getAllJobs } from "../features/jobs/jobApi";
import { archiveJob, jobArraySelector } from "../features/jobs/jobSlice";
import { Container, Paper } from '@mui/material';

const JobContainer = () => {
  const [jobs, setJobs] = useState([]);

  const jobsList = useAppSelector(jobArraySelector);
  const user = useAppSelector(userSelector);
  const dispatch = useAppDispatch();

  const handleGetAllUserJobs = async () => {
    try {
      if (user) {
        const userId = user?._id;
        const { data } = await axios.get(`/api/jobs/user/${userId}`);
        console.log(data);
        setJobs(data.jobsDB.jobs);
        dispatch(getAllJobs({ userId }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetAllUserJobs();
  }, [user]);

  return (
    <Container>

      {jobsList &&
          jobsList.map((job: any) => {
            return (
              <JobItem key={job.job._id} item={job.job} cv={job.cvFile[0]} />
            );
          })}

    </Container>

    // <div>
    //   <h1>Jobs</h1>
    //   <div>
    //     {jobsList &&
    //       jobsList.map((job: any) => {
    //         return (
    //           <JobItem key={job.job._id} item={job.job} cv={job.cvFile[0]} />
    //         );
    //       })}
    //   </div>
    // </div>
  );
};

export default JobContainer;
