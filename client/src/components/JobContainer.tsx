import axios from "axios";
import React, { useEffect, useState } from "react";
import JobItem from "./JobItem";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { userSelector } from "../features/user/userSlice";
import { Job } from "../features/jobs/jobModel";
import { getAllJobs } from "../features/jobs/jobApi";
import { archiveJob, jobArraySelector } from "../features/jobs/jobSlice";
import { Container, Paper, Typography, Grid } from "@mui/material";
import { GridFilterModel, DataGrid } from "@mui/x-data-grid";
import Filter from "./Filter";

const JobContainer = () => {
  // const [jobs, setJobs] = useState([]);
  const [filterList, setFilterList] = useState<Job[]>([]);

  const jobsList = useAppSelector(jobArraySelector);
  const user = useAppSelector(userSelector);
  const dispatch = useAppDispatch();

  // const handleSetFilterList = (jobs:Job[]) => {
  //   const list = jobs.map(() => {

  //   })
  // }

  const filterModel: GridFilterModel = {
    items: [{ id: 1, field: "title", operator: "is", value: "fullstack" }],
  };

  const handleGetAllUserJobs = async () => {
    try {
      if (user) {
        const userId = user?._id;
        const { data } = await axios.get(`/api/jobs/user/${userId}`);
        console.log(data);
        // setJobs(data.jobsDB.jobs);
        dispatch(getAllJobs({ userId }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetAllUserJobs();
  }, [user]);

  useEffect(() => {
    setFilterList(jobsList);
  }, [jobsList]);

  return (
    <Container>
      <Filter
        filterList={filterList}
        setFilterList={setFilterList}
        jobsList={jobsList}
      />
      <Grid container spacing={2} gridAutoRows={'1fr'}>
        {filterList.length > 0 &&
          filterList.map((job: any) => {
            return (
              <JobItem key={job.job._id} item={job.job} cv={job.cvFile[0]} />
            );
          })}
        {filterList.length == 0 ? (

          <Paper elevation={3} sx={{ p: 3, my: 4, height: "90%" , width: '90vw'}}>
            <Typography  variant="h4">No jobs found</Typography>
          </Paper>
        ) : null}
      </Grid>
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
