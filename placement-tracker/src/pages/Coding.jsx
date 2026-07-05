import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import ProgressChart from "../components/ProgressChart";

function Coding() {
  const [topic, setTopic] = useState("");
  const [problemsSolved, setProblemsSolved] = useState("");
  const [progress, setProgress] = useState([]);
  const [totalSolved, setTotalSolved] = useState(0);

  useEffect(() => {
    fetchProgress();
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

      setProgress(res.data);

      let total = 0;

      res.data.forEach((item) => {
        total += Number(item.problemsSolved);
      });

      setTotalSolved(total);
    } catch (error) {
      console.log(error);
    }
  };

  const addProgress = async () => {
    try {
      await axios.post(
        "/api/progress/add",
        {
          topic,
          problemsSolved,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      setTopic("");
      setProblemsSolved("");

      fetchProgress();

      alert("Progress Added Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container-fluid mt-4">

        <h1 className="mb-4">
          Coding Progress
        </h1>

        <div className="card shadow p-4 mb-4">
          <h3>Add Coding Progress</h3>

          <input
            className="form-control mb-3"
            type="text"
            placeholder="Topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />

          <input
            className="form-control mb-3"
            type="number"
            placeholder="Problems Solved"
            value={problemsSolved}
            onChange={(e) =>
              setProblemsSolved(e.target.value)
            }
          />

          <button
            className="btn btn-primary"
            onClick={addProgress}
          >
            Add Progress
          </button>
        </div>

        <div className="card shadow p-4 mb-4">
          <h3>Total Problems Solved</h3>
          <h2>{totalSolved}</h2>
        </div>

        <div className="card shadow p-4 mb-4">
          <h3>Coding Progress Chart</h3>
          <ProgressChart progress={progress} />
        </div>

        <div className="card shadow p-4">
          <h3>Progress History</h3>

          {progress.length === 0 ? (
            <p>No progress added yet.</p>
          ) : (
            progress.map((item) => (
              <div
                key={item._id}
                className="border rounded p-3 mb-2"
              >
                <h5>{item.topic}</h5>
                <p>
                  Problems Solved: {item.problemsSolved}
                </p>
              </div>
            ))
          )}
        </div>

      </div>
    </Layout>
  );
}

export default Coding;