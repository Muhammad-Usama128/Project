import { useState, useEffect } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import "./App.css";
import Home from "../components/Home/Home";
import Register from "../components/Register/Register";
import Login from "../components/Login/Login";
import FaceHook from "../components/FaceHook/FaceHook";
import Instakilo from "../components/Instakilo/Instakilo";
import Switter from "../components/Switter/Switter";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/facehook" element={<FaceHook />} />
        <Route path="/instakilo" element={<Instakilo />} />
        <Route path="/switter" element={<Switter />} />
      </Routes>
    </Router>
  );
}

export default App;
