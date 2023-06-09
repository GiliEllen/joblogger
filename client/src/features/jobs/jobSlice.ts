import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Job } from "./jobModel";
import { Status } from "../user/userSlice";
import { getAllJobs } from "./jobApi";

export interface JobArrayState {
  value: Job[] | null;
  status: Status;
}

const initialState: JobArrayState = {
  value: [],
  status: Status.IDLE,
};

export const jobArraySlice = createSlice({
  name: "jobArray",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllJobs.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(getAllJobs.fulfilled, (state, action) => {
        state.status = Status.IDLE;
        state.value = action.payload;
      })
      .addCase(getAllJobs.rejected, (state) => {
        state.status = Status.FAILED;
      });
  },
});

// export const { logout } = jobSlice.actions;

export const jobArraySelector = (state: RootState) => state.jobArray.value;
export const jobStatusSelector = (state: RootState) => state.jobArray.status;

export default jobArraySlice.reducer;
