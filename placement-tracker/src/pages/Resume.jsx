import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

function Resume() {
  const [score, setScore] = useState("");
  const [resumeData, setResumeData] = useState([]);

  useEffect(() => {
    fetchResume();
  }, []);

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

      setResumeData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addResumeScore = async () => {
    try {
      await axios.post(
        "/api/resume/add",
        {
          score,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      setScore("");

      fetchResume();

      alert("Resume Score Added Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container-fluid mt-4">

        <h1 className="mb-4">
          Resume Score Tracker
        </h1>

        <div className="card shadow p-4 mb-4">

          <h3>Add Resume Score</h3>

          <input
            className="form-control mb-3"
            type="number"
            placeholder="Resume Score"
            value={score}
            onChange={(e) =>
              setScore(e.target.value)
            }
          />

          <button
            className="btn btn-primary"
            onClick={addResumeScore}
          >
            Save Score
          </button>

        </div>

        <div className="card shadow p-4">

          <h3>Resume Score History</h3>

          {resumeData.length === 0 ? (
            <p>No resume scores added yet.</p>
          ) : (
            resumeData.map((item) => (
              <div
                key={item._id}
                className="border rounded p-3 mb-2"
              >
                <h5>
                  Resume Score: {item.score}%
                </h5>
              </div>
            ))
          )}

        </div>

      </div>
    </Layout>
  );
}

export default Resume;