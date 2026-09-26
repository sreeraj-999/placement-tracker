import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import "./Register.css";
import Lottie from "lottie-react";
import codeAnimation from "../assets/code.json";

function Login() {
  const [loginType, setLoginType] = useState("student");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const loginUser = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const res = await axios.post("/api/users/login", {
        email,
        password,
      });

      // =================================
      // CHECK LOGIN TYPE
      // =================================

      if (
        loginType === "admin" &&
        res.data.role !== "admin"
      ) {
        alert(
          "This account is not an admin account."
        );
        return;
      }

      if (
        loginType === "student" &&
        res.data.role === "admin"
      ) {
        alert(
          "This is an admin account. Please select Login as Admin."
        );
        return;
      }

      // =================================
      // SAVE LOGIN INFORMATION
      // =================================

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "userId",
        res.data.userId
      );

      localStorage.setItem(
        "name",
        res.data.name
      );

      localStorage.setItem(
        "role",
        res.data.role || "student"
      );

      alert("Login Successful");

      // =================================
      // REDIRECT BASED ON ROLE
      // =================================

      if (res.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }

    } catch (error) {
      console.log("Login Error:", error);

      alert(
        error.response?.data?.message ||
          "Login Failed"
      );
    }
  };

  // =================================
  // CHANGE LOGIN TYPE
  // =================================

  const changeLoginType = (type) => {
    setLoginType(type);

    // Clear old credentials when switching
    setEmail("");
    setPassword("");
  };

  return (
    <div className="register-page">

      <div className="register-container">

        {/* =================================
            LEFT SIDE
        ================================= */}

        <div className="left-side">

          <Lottie
            animationData={codeAnimation}
            loop={true}
            style={{
              width: "90%",
              maxWidth: "420px",
            }}
          />

          <h1>TalentVerse</h1>

          <p>
            Your Complete Placement Preparation Hub
          </p>

        </div>


        {/* =================================
            RIGHT SIDE
        ================================= */}

        <div className="right-side">

          {/* =================================
              STUDENT / ADMIN SLIDING SWITCH
          ================================= */}

          <div className="login-switch">

            {/* Sliding Background */}

            <div
              className={`login-switch-slider ${
                loginType === "admin"
                  ? "admin"
                  : "student"
              }`}
            />

            {/* Student */}

            <button
              type="button"
              className={
                loginType === "student"
                  ? "switch-option active"
                  : "switch-option"
              }
              onClick={() =>
                changeLoginType("student")
              }
            >
              STUDENT
            </button>

            {/* Admin */}

            <button
              type="button"
              className={
                loginType === "admin"
                  ? "switch-option active"
                  : "switch-option"
              }
              onClick={() =>
                changeLoginType("admin")
              }
            >
              ADMIN
            </button>

          </div>


          {/* =================================
              LOGIN TITLE
          ================================= */}

          <h2>
            {loginType === "student"
              ? "Student Login"
              : "Admin Login"}
          </h2>


        


          {/* =================================
              EMAIL
          ================================= */}

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />


          {/* =================================
              PASSWORD
          ================================= */}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />


          {/* =================================
              LOGIN BUTTON
          ================================= */}

          <button
            className="login-button"
            onClick={loginUser}
          >
            {loginType === "student"
              ? "LOGIN AS STUDENT"
              : "LOGIN AS ADMIN"}
          </button>


          {/* =================================
              REGISTER
              ONLY FOR STUDENT
          ================================= */}

          {loginType === "student" && (
            <p className="register-text">

              Don't have an account?{" "}

              <Link to="/register">
                Register
              </Link>

            </p>
          )}

        </div>

      </div>

    </div>
  );
}

export default Login;