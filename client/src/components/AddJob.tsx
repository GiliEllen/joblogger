import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useAppSelector } from "../app/hooks";
import { userSelector } from "../features/user/userSlice";
import JobForm from "./JobForm";
import FileUpload from "./FileUpload";

const AddJob = () => {
  return (
  <>
  <FileUpload/>
  <JobForm type="add" />
  </>
  );
};

export default AddJob;
