import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const loginUser = async () => {
    try {
      const res = await axios.post(
        "/api/users/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("name", res.data.name);

      alert("Login Successful");

      navigate("/dashboard");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">Login</h2>

        <input
          className="form-control mb-3"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="form-control mb-3"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="btn btn-primary w-100"
          onClick={loginUser}
        >
          Login
        </button>

        <div className="text-center mt-3">
          <p>Don't have an account?</p>

          <Link
            to="/register"
            className="btn btn-outline-success"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;