import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Job } from "./jobModel";
import { Status } from "../user/userSlice";
import { getAllJobs } from "./jobApi";

export interface JobArrayState {
  value: Job[];
  status: Status;
}

const initialState: JobArrayState = {
  value: [],
  status: Status.IDLE,
};

export const jobArraySlice = createSlice({
  name: "jobArray",
  initialState,
  reducers: {
    archiveJob: (state, action) => {
      const jobIndex = state.value.findIndex(
        (job) => job._id === action.payload.jobId
      );

      return {
        ...state,
        contents: state.value.map((content, i) =>
          i === jobIndex
            ? { ...content, archive: action.payload.archive }
            : content
        ),
      };
    },
  },
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

export const { archiveJob } = jobArraySlice.actions;

export const jobArraySelector = (state: RootState) => state.jobArray.value;
export const jobStatusSelector = (state: RootState) => state.jobArray.status;

export default jobArraySlice.reducer;
