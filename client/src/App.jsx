import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SignupForm from "./signup";
import LoginForm from "./login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<SignupForm />}></Route>
        <Route path="/login" element={<LoginForm />}></Route>
        <Route path="/home" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
