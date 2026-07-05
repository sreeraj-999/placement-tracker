import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

function Dashboard() {
  const [totalSolved, setTotalSolved] = useState(0);

  const [latestAptitude, setLatestAptitude] = useState({
    quant: 0,
    logical: 0,
    verbal: 0,
  });

  const [resumeScore, setResumeScore] = useState(0);

  const [leetcode, setLeetcode] = useState({
    username: "",
    totalSolved: 0,
    easySolved: 0,
    mediumSolved: 0,
    hardSolved: 0,
  });

  useEffect(() => {
    fetchProgress();
    fetchAptitude();
    fetchResume();
    fetchLeetcode();
  }, []);

  const fetchProgress = async () => {
    try {
      const res = await axios.get(
        "/api/progress",
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      let total = 0;

      res.data.forEach((item) => {
        total += Number(item.problemsSolved);
      });

      setTotalSolved(total);
    } catch (error) {
      console.log(error);
    }
  };

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
        setLatestAptitude(res.data[res.data.length - 1]);
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
        setResumeScore(res.data[res.data.length - 1].score);
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  const syncLeetcode = async () => {
    const username = prompt("Enter your LeetCode Username");

    if (!username) return;

    try {
      await axios.post(
        "/api/leetcode/sync",
        { username },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      fetchLeetcode();

      alert("LeetCode Profile Synced Successfully");
    } catch (error) {
      alert("Unable to Sync Profile");
    }
  };

  const aptitudeScore =
    (Number(latestAptitude.quant) +
      Number(latestAptitude.logical) +
      Number(latestAptitude.verbal)) /
    3;

  const codingScore = Math.min(totalSolved, 100);

  const placementScore =
    (codingScore +
      aptitudeScore +
      Number(resumeScore)) /
    3;

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
              <div className="stat-number">{totalSolved}</div>
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

          <div className="d-flex justify-content-between align-items-center">

            <h3>LeetCode Statistics</h3>

            <button
              className="btn btn-success"
              onClick={syncLeetcode}
            >
              Sync Profile
            </button>

          </div>

          <hr />

          {leetcode.username ? (
            <>

              <h5>Username: {leetcode.username}</h5>

              <div className="row mt-4">

                <div className="col-md-3">
                  <div className="card bg-primary text-white p-3 text-center">
                    <h6>Total</h6>
                    <h2>{leetcode.totalSolved}</h2>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="card bg-success text-white p-3 text-center">
                    <h6>Easy</h6>
                    <h2>{leetcode.easySolved}</h2>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="card bg-warning p-3 text-center">
                    <h6>Medium</h6>
                    <h2>{leetcode.mediumSolved}</h2>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="card bg-danger text-white p-3 text-center">
                    <h6>Hard</h6>
                    <h2>{leetcode.hardSolved}</h2>
                  </div>
                </div>

              </div>

            </>
          ) : (
            <p>No LeetCode profile synced yet.</p>
          )}

        </div>

        <div className="section-card">

          <h3>Preparation Summary</h3>

          <hr />

          <p>
            <strong>Total Coding Problems:</strong> {totalSolved}
          </p>

          <p>
            <strong>Aptitude Performance:</strong>{" "}
            {aptitudeScore.toFixed(1)}%
          </p>

          <p>
            <strong>Resume Quality Score:</strong> {resumeScore}%
          </p>

          <p>
            <strong>Placement Readiness:</strong>{" "}
            {placementScore.toFixed(1)}%
          </p>

        </div>

      </div>
    </Layout>
  );
}

export default Dashboard;