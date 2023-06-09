import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Job } from "./jobModel";


export const getAllJobs = createAsyncThunk(
  "get-all-jobs",
  async ({ userId }: { userId: string }, thunkApi) => {
    try {
      const { data } = await axios.get(`/api/jobs/user/${userId}`);
      if (!data)
        throw new Error(
          "Couldn't receive data from axios GET '/api/jobs/user/userId' from: jobsAPI "
        ); 
      const { jobsDB } = data;
      return jobsDB;
    } catch (error: any) {
      console.error(error);
      return thunkApi.rejectWithValue({
        error: error.message,
        message: error.message,
      });
    }
  }
);


