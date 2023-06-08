import axios from "axios";
import React, { useEffect, useState } from "react";
import JobItem from "./JobItem";

const JobContainer = () => {
  const [jobs, setJobs] = useState([]);

  const handleGetAllUserJobs = async () => {
    try {
      const userId = 1;
      const { data } = await axios.get(`/api/jobs/${userId}`);
      setJobs(data.jobsDB);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetAllUserJobs()
  },[])

  return (
    <div>
      <h1>Jobs</h1>
      <div>
        {jobs.map((job) => {return <JobItem item={job}/>})}
      </div>
    </div>
  );
};

export default JobContainer;
