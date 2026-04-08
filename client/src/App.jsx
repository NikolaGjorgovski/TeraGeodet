import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SignupForm from "./signup";
import LoginForm from "./login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<SignupForm />}></Route>
        <Route path="/login" element={<LoginForm />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
