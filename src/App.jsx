import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import "./App.css";
import logo from "./assets/logos.png";
import Login from "./pages/userLogin";
import Register from "./pages/registration";
import UserDashboard from "./pages/userDashboard";
import Discounts from "./pages/discounts";
import kcoin from "./assets/Kcoin.png";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="container">
      <h1 className="title">Kind Wallet</h1>
      <img src={logo} alt="Kind Wallet Logo" className="logo" />
      <p>Spreading kindness one coin at a time</p>
      <button className="button" onClick={() => navigate("/register")}> Get Started </button>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/discounts" element={<Discounts />} />
      </Routes>
    </Router>
  );
}

export default App;
