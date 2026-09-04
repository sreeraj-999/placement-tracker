import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import "./Register.css";
import Lottie from "lottie-react";
import codeAnimation from "../assets/code.json";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const loginUser = async () => {

    try {

      const res = await axios.post("/api/users/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("name", res.data.name);

      alert("Login Successful");

      navigate("/dashboard");

    } catch (error) {

      alert(error.response?.data?.message || "Login Failed");

    }

  };

  return (

<div className="register-page">

      <div className="register-container">

        <div className="left-side">

          <Lottie
            animationData={codeAnimation}
            loop={true}
            style={{
                    width: "90%",
                    maxWidth: "420px"
                }}
          />

          <h1>TalentVerse</h1>

          <p>Your Complete Placement Preparation Hub</p>

        </div>

        <div className="right-side">

          <h2>Login Here</h2>

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

          <button onClick={loginUser}>
            Login
          </button>

          <p>
            Don't have an account?
            <Link to="/register">
              Register
            </Link>
          </p>

        </div>

      </div>

    </div>

  );
}

export default Login;