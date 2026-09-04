import { useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

function ResumeAnalyzer() {

  const [resume, setResume] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeResume = async () => {

    if (!resume) {
      alert("Please select a resume.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);

    try {

      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/ai/analyze",
        formData,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResult(res.data);

    } catch (error) {

      console.log(error);

      alert("Resume Analysis Failed");

    }

    setLoading(false);

  };

  return (

    <Layout>

      <div className="container mt-4">

        <div className="card shadow p-4">

          <h2 className="mb-4">
            AI Resume Analyzer
          </h2>

          <input
            type="file"
            className="form-control mb-3"
            accept=".pdf"
            onChange={(e) => setResume(e.target.files[0])}
          />

          <button
            className="btn btn-primary"
            onClick={analyzeResume}
          >
            {loading ? "Analyzing..." : "Analyze Resume"}
          </button>

        </div>

        {result && (

          <div className="card shadow p-4 mt-4">

            <h2 className="mb-4">
              Resume Analysis Report
            </h2>

            <div className="row text-center mb-4">

              <div className="col-md-6">

                <div className="card bg-primary text-white p-3">

                  <h5>Resume Score</h5>

                  <h1>{result.resumeScore}%</h1>

                </div>

              </div>

              <div className="col-md-6">

                <div className="card bg-success text-white p-3">

                  <h5>ATS Score</h5>

                  <h1>{result.atsScore}%</h1>

                </div>

              </div>

            </div>

            <hr />

            <h4 className="mb-3">
              Section Wise Score
            </h4>

            <table className="table table-bordered">

              <tbody>

                <tr>
                  <td>Contact Information</td>
                  <td>{result.breakdown.contact}/10</td>
                </tr>

                <tr>
                  <td>Education</td>
                  <td>{result.breakdown.education}/15</td>
                </tr>

                <tr>
                  <td>Skills</td>
                  <td>{result.breakdown.skills}/20</td>
                </tr>

                <tr>
                  <td>Projects</td>
                  <td>{result.breakdown.projects}/20</td>
                </tr>

                <tr>
                  <td>Experience</td>
                  <td>{result.breakdown.experience}/20</td>
                </tr>

                <tr>
                  <td>Formatting</td>
                  <td>{result.breakdown.formatting}/10</td>
                </tr>

                <tr>
                  <td>Grammar</td>
                  <td>{result.breakdown.grammar}/5</td>
                </tr>

              </tbody>

            </table>

            <hr />

            <h4>Skills Detected</h4>

            <div className="mb-4">

              {result.skillsDetected.map((skill, index) => (

                <span
                  key={index}
                  className="badge bg-primary me-2 mb-2 p-2"
                >
                  {skill}
                </span>

              ))}

            </div>

            <h4>Missing Skills</h4>

            <ul>

              {result.missingSkills.map((item, index) => (

                <li key={index}>
                  {item}
                </li>

              ))}

            </ul>

            <h4>Strengths</h4>

            <ul>

              {result.strengths.map((item, index) => (

                <li key={index}>
                  {item}
                </li>

              ))}

            </ul>

            <h4>Weaknesses</h4>

            <ul>

              {result.weaknesses.map((item, index) => (

                <li key={index}>
                  {item}
                </li>

              ))}

            </ul>

            <h4>AI Suggestions</h4>

            <ul>

              {result.suggestions.map((item, index) => (

                <li key={index}>
                  {item}
                </li>

              ))}

            </ul>

          </div>

        )}

      </div>

    </Layout>

  );

}

export default ResumeAnalyzer;