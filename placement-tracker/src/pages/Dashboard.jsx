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

useEffect(() => {
fetchProgress();
fetchAptitude();
fetchResume();
}, []);

const fetchProgress = async () => {
try {
const res = await axios.get(
"http://localhost:5000/api/progress",
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
"http://localhost:5000/api/aptitude",
{
headers: {
Authorization: localStorage.getItem("token"),
},
}
);

  if (res.data.length > 0) {
    setLatestAptitude(
      res.data[res.data.length - 1]
    );
  }
} catch (error) {
  console.log(error);
}

};

const fetchResume = async () => {
try {
const res = await axios.get(
"http://localhost:5000/api/resume",
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

const aptitudeScore =
(
Number(latestAptitude.quant) +
Number(latestAptitude.logical) +
Number(latestAptitude.verbal)
) / 3;

const codingScore = Math.min(totalSolved, 100);

const placementScore =
(
codingScore +
aptitudeScore +
Number(resumeScore)
) / 3;

return ( 
<Layout> <div className="container-fluid mt-4">


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

  <div className="section-card">
    <h3>📈 Preparation Summary</h3>

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
