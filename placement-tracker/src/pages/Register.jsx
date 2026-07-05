import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async () => {
    try {
      const res = await axios.post(
        "/api/users/register",
        {
          name,
          email,
          password,
        }
      );

      alert(res.data.message);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">
          Create Account
        </h2>

        <input
          className="form-control mb-3"
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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
          className="btn btn-success w-100"
          onClick={registerUser}
        >
          Register
        </button>

        <div className="text-center mt-3">
          <p>Already have an account?</p>

          <Link
            to="/login"
            className="btn btn-outline-primary"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;