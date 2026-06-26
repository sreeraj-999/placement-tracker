import { Link } from "react-router-dom";

function Sidebar() {
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("name");

    window.location.href = "/login";
  };

  return (
    <div
      style={{
        width: "260px",
        minHeight: "100vh",
        background: "#1e293b",
        color: "white",
        padding: "25px",
        boxShadow: "2px 0 10px rgba(0,0,0,0.2)",
      }}
    >
      <h2
        className="mb-4 text-center"
        style={{
          fontWeight: "bold",
          borderBottom: "1px solid #475569",
          paddingBottom: "15px",
        }}
      >
        🎯 Placement Tracker
      </h2>

      <p
        className="text-center mb-4"
        style={{ color: "#cbd5e1" }}
      >
        Welcome,
        <br />
        <strong>
          {localStorage.getItem("name")}
        </strong>
      </p>

      <div className="d-grid gap-2">

        <Link
          to="/dashboard"
          className="btn btn-outline-light text-start"
        >
          📊 Dashboard
        </Link>

        <Link
          to="/coding"
          className="btn btn-outline-light text-start"
        >
          💻 Coding Progress
        </Link>

        <Link
          to="/aptitude"
          className="btn btn-outline-light text-start"
        >
          🧠 Aptitude
        </Link>

        <Link
          to="/resume"
          className="btn btn-outline-light text-start"
        >
          📄 Resume Score
        </Link>

        <Link
          to="/company"
          className="btn btn-outline-light text-start"
        >
          🏢 Company Tracker
        </Link>

        <Link
          to="/analytics"
          className="btn btn-outline-light text-start"
        >
          📈 Analytics
        </Link>

        <hr style={{ color: "#64748b" }} />

        <button
          className="btn btn-danger"
          onClick={logout}
        >
         Logout
        </button>

      </div>
    </div>
  );
}

export default Sidebar;