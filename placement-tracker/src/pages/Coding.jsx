import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

import {
  Pie
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function Coding() {

  const [leetcode, setLeetcode] = useState({
    username: "",
    totalSolved: 0,
    easySolved: 0,
    mediumSolved: 0,
    hardSolved: 0,
    updatedAt: "",
  });

  useEffect(() => {
    fetchLeetcode();
  }, []);

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

    } catch (err) {
      console.log(err);
    }

  };

  const syncAgain = async () => {

    try {

      await axios.post(
        "/api/leetcode/sync",
        {
          username: leetcode.username,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      fetchLeetcode();

      alert("Synced Successfully");

    } catch {

      alert("Sync Failed");

    }

  };

  const target = 500;

  const progress =
    ((leetcode.totalSolved / target) * 100).toFixed(1);

  const chartData = {

    labels: [
      "Easy",
      "Medium",
      "Hard",
    ],

    datasets: [
      {
        data: [
          leetcode.easySolved,
          leetcode.mediumSolved,
          leetcode.hardSolved,
        ],

        backgroundColor: [
          "#4CAF50",
          "#FFC107",
          "#F44336",
        ],
      },
    ],
  };

  return (

    <Layout>

      <div className="container mt-4">

        <h2 className="mb-4">
          Coding Progress
        </h2>

        <div className="card shadow p-4">

          <h4>{leetcode.username}</h4>

          <p className="text-success">
            ● Connected to LeetCode
          </p>

          <p>
            Last Sync :
            {" "}
            {
              leetcode.updatedAt
                ? new Date(
                    leetcode.updatedAt
                  ).toLocaleString()
                : "Never"
            }
          </p>

          <hr />

          <h3>
            Total Problems Solved
          </h3>

          <h1>
            {leetcode.totalSolved}
          </h1>

          <hr />

          <div className="row">

            <div className="col-md-4">

              <div className="card bg-success text-white p-3">

                <h5>Easy</h5>

                <h2>
                  {leetcode.easySolved}
                </h2>

              </div>

            </div>

            <div className="col-md-4">

              <div className="card bg-warning p-3">

                <h5>Medium</h5>

                <h2>
                  {leetcode.mediumSolved}
                </h2>

              </div>

            </div>

            <div className="col-md-4">

              <div className="card bg-danger text-white p-3">

                <h5>Hard</h5>

                <h2>
                  {leetcode.hardSolved}
                </h2>

              </div>

            </div>

          </div>

          <hr />

          <h4>Goal Progress</h4>

          <div className="progress">

            <div
              className="progress-bar"
              style={{
                width: `${progress}%`,
              }}
            >
              {progress}%
            </div>

          </div>

          <p className="mt-2">
            {leetcode.totalSolved}
            {" / "}
            {target}
          </p>

          <hr />

          <h4>Achievements</h4>

          <ul>

            {leetcode.totalSolved >= 50 &&
              <li>🥉 Beginner</li>}

            {leetcode.totalSolved >= 100 &&
              <li>🥈 Intermediate</li>}

            {leetcode.totalSolved >= 200 &&
              <li>🥇 Advanced</li>}

            {leetcode.totalSolved >= 500 &&
              <li>🏆 Elite</li>}

          </ul>

          <hr />

          <h4>
            Difficulty Distribution
          </h4>

          <div
            style={{
              width: 350,
              margin: "auto",
            }}
          >

            <Pie data={chartData} />

          </div>

          <button
            className="btn btn-primary mt-4"
            onClick={syncAgain}
          >
            Sync Again
          </button>

        </div>

      </div>

    </Layout>

  );

}

export default Coding;