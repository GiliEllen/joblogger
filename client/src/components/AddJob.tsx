import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useAppSelector } from "../app/hooks";
import { userSelector } from "../features/user/userSlice";
import JobForm from "./JobForm";

const AddJob = () => {
  return <JobForm type="add" />;
};

export default AddJob;
