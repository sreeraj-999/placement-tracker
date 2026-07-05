import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

function Analytics() {
  const [totalSolved, setTotalSolved] = useState(0);
  const [aptitudeScore, setAptitudeScore] = useState(0);
  const [resumeScore, setResumeScore] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const progressRes = await axios.get(
        "/api/progress",
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      let total = 0;

      progressRes.data.forEach((item) => {
        total += Number(item.problemsSolved);
      });

      setTotalSolved(total);

      const aptitudeRes = await axios.get(
        "/api/aptitude"
      );

      if (aptitudeRes.data.length > 0) {
        const latest =
          aptitudeRes.data[
            aptitudeRes.data.length - 1
          ];

        const avg =
          (
            Number(latest.quant) +
            Number(latest.logical) +
            Number(latest.verbal)
          ) / 3;

        setAptitudeScore(avg);
      }

      const resumeRes = await axios.get(
        "/api/resume"
      );

      if (resumeRes.data.length > 0) {
        setResumeScore(
          resumeRes.data[
            resumeRes.data.length - 1
          ].score
        );
      }

    } catch (error) {
      console.log(error);
    }
  };

  const placementReadiness =
    (
      Math.min(totalSolved, 100) +
      aptitudeScore +
      Number(resumeScore)
    ) / 3;

  const getRecommendation = () => {
    if (placementReadiness >= 80)
      return "Excellent! Ready for placements.";

    if (placementReadiness >= 60)
      return "Good progress. Keep improving.";

    return "Focus more on coding, aptitude and resume.";
  };

  return (
    <Layout>
      <div className="container-fluid mt-4">

        <h1 className="mb-4">
          Analytics Dashboard
        </h1>

        <div className="row">

          <div className="col-md-4 mb-3">
            <div className="card shadow text-center">
              <div className="card-body">
                <h5>Total Problems Solved</h5>
                <h2>{totalSolved}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card shadow text-center">
              <div className="card-body">
                <h5>Aptitude Score</h5>
                <h2>{aptitudeScore.toFixed(1)}%</h2>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card shadow text-center">
              <div className="card-body">
                <h5>Resume Score</h5>
                <h2>{resumeScore}%</h2>
              </div>
            </div>
          </div>

        </div>

        <div className="card shadow p-4 mt-4">

          <h3>
            Placement Readiness:
            {" "}
            {placementReadiness.toFixed(1)}%
          </h3>

          <hr />

          <h4>
            Recommendation
          </h4>

          <p>
            {getRecommendation()}
          </p>

        </div>

      </div>
    </Layout>
  );
}

export default Analytics;