import axios from "axios";
import React, { useEffect, useState } from "react";
import JobItem from "./JobItem";
import { useAppSelector } from "../app/hooks";
import { userSelector } from "../features/user/userSlice";
import { Job } from "../features/jobs/jobModel";

const JobContainer = () => {
  const [jobs, setJobs] = useState([]);
  const user = useAppSelector(userSelector);

  const handleGetAllUserJobs = async () => {
    try {
      const userId = user?._id;
      const { data } = await axios.get(`/api/jobs/${userId}`);
      console.log(data);
      setJobs(data.jobsDB);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetAllUserJobs();
  }, []);

  return (
    <div>
      <h1>Jobs</h1>
      <div>
        {jobs.map((job: Job) => {
          return <JobItem key={job._id} item={job} />;
        })}
      </div>
    </div>
  );
};

export default JobContainer;
