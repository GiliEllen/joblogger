import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import RegisterForm from "./views/Register";
import LoginForm from "./views/Login";
import Home from "./views/home/Home";
import SignInSide from "./views/LoginToTheSide";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignInSide/>} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/home" element={<Home />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
