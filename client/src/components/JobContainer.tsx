import axios from "axios";
import React, { useEffect, useState } from "react";
import JobItem from "./JobItem";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { userSelector } from "../features/user/userSlice";
import { Job } from "../features/jobs/jobModel";
import { getAllJobs } from "../features/jobs/jobApi";

const JobContainer = () => {
  const [jobs, setJobs] = useState([]);
  const user = useAppSelector(userSelector);
  const dispatch = useAppDispatch();

  const handleGetAllUserJobs = async () => {
    try {
      if (user) {
        const userId = user?._id;
        const { data } = await axios.get(`/api/jobs/user/${userId}`);
        console.log(data);
        setJobs(data.jobsDB);
        dispatch(getAllJobs({ userId }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleArchiveJob = async (jobId: string) => {
    try {
      const { data } = await axios.put(`/api/jobs/job/${jobId}`);
      if (data.archived) {
        console.log("archived successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetAllUserJobs();
  }, [user]);

  return (
    <div>
      <h1>Jobs</h1>
      <div>
        {jobs.map((job: Job) => {
          return (
            <JobItem
              key={job._id}
              item={job}
              handleArchive={handleArchiveJob}
            />
          );
        })}
      </div>
    </div>
  );
};

export default JobContainer;
