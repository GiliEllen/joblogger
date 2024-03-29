import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import RegisterForm from "./views/Register";
import LoginForm from "./views/Login";
import Home from "./views/home/Home";
import SignInSide from "./views/LoginToTheSide";
import AddJob from "./components/AddJob";
import JobInformation from "./views/home/JobInformation";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignInSide />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/home" element={<Home />} />
          <Route path="/add-job" element={<AddJob />} />
          <Route path="/job-info/:jobId" element={<JobInformation />} />
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  );
}

export default App;
