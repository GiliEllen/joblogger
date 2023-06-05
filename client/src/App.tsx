import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import RegisterForm from "./views/Register";

function App() {

  const [user, setUser] = useState()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>hello</div>} />
        <Route path="/register" element={<RegisterForm />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
