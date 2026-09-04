import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

function Dashboard() {

  const [latestAptitude, setLatestAptitude] = useState({
    percentage: 0,
  });

  const [resumeScore, setResumeScore] = useState(0);

  const [leetcode, setLeetcode] = useState({
    username: "",
    totalSolved: 0,
    easySolved: 0,
    mediumSolved: 0,
    hardSolved: 0,
  });

  const [leetcodeUsername, setLeetcodeUsername] = useState("");

  useEffect(() => {
    fetchAptitude();
    fetchResume();
    fetchLeetcode();
  }, []);

  const fetchAptitude = async () => {
    try {
      const res = await axios.get(
        "/api/aptitude",
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (res.data.length > 0) {
        setLatestAptitude(res.data[0]);
      }

    } catch (error) {
      console.log(error);
    }
  };

  const fetchResume = async () => {
    try {
      const res = await axios.get(
        "/api/resume",
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (res.data.length > 0) {
        setResumeScore(
          res.data[res.data.length - 1].score
        );
      }

    } catch (error) {
      console.log(error);
    }
  };

  const fetchLeetcode = async () => {
    try {
      const res = await axios.get(
        "/api/leetcode",
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (res.data) {
        setLeetcode(res.data);
        setLeetcodeUsername(res.data.username || "");
      }

    } catch (error) {
      console.log(error);
    }
  };

  const syncLeetcode = async () => {

    if (!leetcodeUsername) {
      alert("Please enter your LeetCode username");
      return;
    }

    try {

      await axios.post(
        "/api/leetcode/sync",
        {
          username: leetcodeUsername,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      await fetchLeetcode();

      alert("LeetCode Profile Synced Successfully");

    } catch (error) {

      console.log(error);

      alert("Unable to Sync Profile");

    }
  };

  // Aptitude Score from latest completed test

  const aptitudeScore = Number(
    latestAptitude.percentage || 0
  );

  // Coding score out of 100

  const codingScore = Math.min(
    leetcode.totalSolved,
    100
  );

  // Overall Placement Score

  const placementScore =
    (
      codingScore +
      aptitudeScore +
      Number(resumeScore)
    ) / 3;

  return (
    <Layout>

      <div className="container-fluid mt-4">

        <div className="mb-4">

          <h1 className="page-title">
            Welcome Back, {localStorage.getItem("name")}
          </h1>

          <p className="page-subtitle">
            Track your placement preparation journey
          </p>

        </div>

        <div className="row g-4 mb-4">

          <div className="col-md-3">

            <div className="stat-card primary-gradient">

              <h6>Total Problems Solved</h6>

              <div className="stat-number">
                {leetcode.totalSolved}
              </div>

            </div>

          </div>

          <div className="col-md-3">

            <div className="stat-card success-gradient">

              <h6>Aptitude Score</h6>

              <div className="stat-number">
                {aptitudeScore.toFixed(1)}%
              </div>

            </div>

          </div>

          <div className="col-md-3">

            <div className="stat-card warning-gradient">

              <h6>Resume Score</h6>

              <div className="stat-number">
                {resumeScore}%
              </div>

            </div>

          </div>

          <div className="col-md-3">

            <div className="stat-card danger-gradient">

              <h6>Placement Ready</h6>

              <div className="stat-number">
                {placementScore.toFixed(1)}%
              </div>

            </div>

          </div>

        </div>

        {/* LeetCode Section */}

        <div className="card shadow p-4 mb-4">

          <h3 className="mb-4">
            LeetCode Integration
          </h3>

          <div className="row mb-4">

            <div className="col-md-8">

              <input
                className="form-control"
                placeholder="Enter LeetCode Username"
                value={leetcodeUsername}
                onChange={(e) =>
                  setLeetcodeUsername(e.target.value)
                }
              />

            </div>

            <div className="col-md-4">

              <button
                className="btn btn-success w-100"
                onClick={syncLeetcode}
              >
                Sync Profile
              </button>

            </div>

          </div>

          <hr />

          {leetcode.username ? (

            <>

              <div className="d-flex justify-content-between align-items-center mb-3">

                <div>

                  <h5>
                    {leetcode.username}
                  </h5>

                  <small className="text-success">
                    ● Connected to LeetCode
                  </small>

                </div>

              </div>

              <div className="row mt-4">

                <div className="col-md-3">

                  <div className="card bg-primary text-white p-3 text-center">

                    <h6>Total</h6>

                    <h2>
                      {leetcode.totalSolved}
                    </h2>

                  </div>

                </div>

                <div className="col-md-3">

                  <div className="card bg-success text-white p-3 text-center">

                    <h6>Easy</h6>

                    <h2>
                      {leetcode.easySolved}
                    </h2>

                  </div>

                </div>

                <div className="col-md-3">

                  <div className="card bg-warning p-3 text-center">

                    <h6>Medium</h6>

                    <h2>
                      {leetcode.mediumSolved}
                    </h2>

                  </div>

                </div>

                <div className="col-md-3">

                  <div className="card bg-danger text-white p-3 text-center">

                    <h6>Hard</h6>

                    <h2>
                      {leetcode.hardSolved}
                    </h2>

                  </div>

                </div>

              </div>

            </>

          ) : (

            <p>
              No LeetCode profile synced yet.
            </p>

          )}

        </div>

      </div>

    </Layout>
  );
}

export default Dashboard;