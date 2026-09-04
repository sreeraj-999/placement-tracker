import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import "./Register.css";

import Lottie from "lottie-react";
import codeAnimation from "../assets/code.json";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const registerUser = async () => {
    try {
      await axios.post("/api/users/register", {
        name,
        email,
        password,
      });

      alert("Registration Successful");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
<div className="register-page">

      <div className="register-container">

        {/* Left Side */}
        <div className="left-side">

          <Lottie
            animationData={codeAnimation}
            loop={true}
            style={{
              width: "90%",
              maxWidth: "420px",
              marginBottom: "20px",
            }}
          />

          <h1>TalentVerse</h1>

          <p>Your Complete Placement Preparation Hub</p>

        </div>

        {/* Right Side */}
        <div className="right-side">

          <h2>Create Account</h2>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={registerUser}>
            Register
          </button>

          <p>
            Already have an account?
            <Link to="/login"> Login</Link>
          </p>

        </div>

      </div>
    </div>
  );
}

export default Register;