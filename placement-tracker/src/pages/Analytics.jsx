
import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

// Get Monday of a week
function getWeekStart(date) {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);

  const day = result.getDay();
  result.setDate(result.getDate() - (day === 0 ? 6 : day - 1));

  return result;
}

// Add days to a date
function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

// Check if two dates are the same day
function sameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

// Format date
function formatDate(date) {
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
}

function Analytics() {
  const [leetcode, setLeetcode] = useState(null);
  const [aptitude, setAptitude] = useState([]);
  const [resumeScore, setResumeScore] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedWeek, setSelectedWeek] = useState(() =>
    getWeekStart(new Date())
  );

  // Fetch all analytics data
  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const config = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };

      const [leetcodeRes, aptitudeRes, resumeRes] =
        await Promise.all([
          axios.get("/api/leetcode", config),
          axios.get("/api/aptitude", config),
          axios.get("/api/resume", config),
        ]);

      setLeetcode(leetcodeRes.data || null);

      const aptitudeData = Array.isArray(aptitudeRes.data)
        ? aptitudeRes.data
        : [];

      setAptitude(aptitudeData);

      const resumes = Array.isArray(resumeRes.data)
        ? resumeRes.data
        : [];

      // Same ordering logic as Dashboard.jsx
      setResumeScore(
        resumes.length
          ? Number(resumes[resumes.length - 1].score) || 0
          : 0
      );
    } catch (err) {
      console.error("Analytics error:", err);
      setError(
        err.response?.data?.message ||
          "Unable to load analytics."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Week calculations
  const weekEnd = addDays(selectedWeek, 7);
  const previousWeek = addDays(selectedWeek, -7);
  const nextWeek = addDays(selectedWeek, 7);

  const currentWeekStart = getWeekStart(new Date());

  const isCurrentWeek = sameDay(
    selectedWeek,
    currentWeekStart
  );

  const history = leetcode?.syncHistory || [];

  // Coding sync entries in selected week
  const historyInWeek = history.filter((item) => {
    if (!item.date) return false;

    const date = new Date(item.date);
    return date >= selectedWeek && date < weekEnd;
  });

  // Aptitude attempts in selected week
  const aptitudeInWeek = aptitude.filter((item) => {
    if (!item.createdAt) return false;

    const date = new Date(item.createdAt);
    return date >= selectedWeek && date < weekEnd;
  });

  // Weekly coding count
  const weeklyCoding = historyInWeek.reduce(
    (sum, item) =>
      sum + (Number(item.problemsSolved) || 0),
    0
  );

  // Overall coding count
  const totalCoding = Number(
    leetcode?.totalSolved || 0
  );

  // Overall aptitude attempts
  const totalAptitude = aptitude.length;

  // Daily activity for selected week
  const dailyActivity = Array.from(
    { length: 7 },
    (_, index) => {
      const date = addDays(selectedWeek, index);
      const nextDate = addDays(date, 1);

      const coding = history
        .filter((item) => {
          if (!item.date) return false;

          const itemDate = new Date(item.date);
          return itemDate >= date && itemDate < nextDate;
        })
        .reduce(
          (sum, item) =>
            sum + (Number(item.problemsSolved) || 0),
          0
        );

      const tests = aptitude.filter((item) => {
        if (!item.createdAt) return false;

        const itemDate = new Date(item.createdAt);
        return itemDate >= date && itemDate < nextDate;
      }).length;

      return {
        date,
        label: date.toLocaleDateString("en-IN", {
          weekday: "short",
        }),
        coding,
        tests,
      };
    }
  );

  // Dashboard-compatible aptitude score:
  // latest aptitude test percentage
  const latestAptitudeScore = aptitude.length
    ? Number(aptitude[0].percentage) || 0
    : 0;

  // Dashboard-compatible coding score
  const codingScore = Math.min(
    totalCoding,
    100
  );

  // Exact same placement score formula as Dashboard.jsx
  const readiness = (
    codingScore +
    latestAptitudeScore +
    Number(resumeScore)
  ) / 3;

  // Separate personalized recommendations


// APTITUDE RECOMMENDATIONS
const getAptitudeRecommendations = () => {
  if (aptitude.length === 0) {
    return [
      {
        title: "Attempt your first aptitude test",
        detail:
          "Complete an aptitude test to understand your current performance and identify areas for improvement.",
      },
      {
        title: "Build your fundamentals",
        detail:
          "Start with basic quantitative aptitude, logical reasoning, and verbal ability questions.",
      },
      {
        title: "Practice regularly",
        detail:
          "Set aside time each day for aptitude practice and track your progress through tests.",
      },
    ];
  }

  if (latestAptitudeScore < 40) {
    return [
      {
        title: "Strengthen your basics",
        detail:
          "Your latest aptitude score is below 40%. Review fundamental concepts in quantitative aptitude, logical reasoning, and verbal ability.",
      },
      {
        title: "Start with easy questions",
        detail:
          "Practice easy-level questions first. Read the explanations for incorrect answers and understand the solving methods.",
      },
      {
        title: "Take regular practice tests",
        detail:
          "Attempt short tests regularly to identify repeated mistakes and gradually improve your score.",
      },
    ];
  }

  if (latestAptitudeScore < 60) {
    return [
      {
        title: "Improve your accuracy",
        detail:
          "Your latest aptitude score is between 40% and 59%. Review the questions you answered incorrectly and focus on those concepts.",
      },
      {
        title: "Move to medium-level questions",
        detail:
          "Practice medium-level problems in quantitative aptitude, logical reasoning, and verbal ability.",
      },
      {
        title: "Review your test results",
        detail:
          "After each test, identify the topics that need more practice and revise them before your next attempt.",
      },
    ];
  }

  if (latestAptitudeScore < 80) {
    return [
      {
        title: "Increase your solving speed",
        detail:
          "Your latest aptitude score is between 60% and 79%. Practice timed tests to improve speed while maintaining accuracy.",
      },
      {
        title: "Challenge yourself",
        detail:
          "Try difficult questions and advanced problem-solving exercises to improve your performance.",
      },
      {
        title: "Maintain consistent practice",
        detail:
          "Continue taking mock tests and review any mistakes to make your performance more consistent.",
      },
    ];
  }

  return [
    {
      title: "Maintain your performance",
      detail:
        "Your latest aptitude score is 80% or higher. Continue practicing regularly to maintain your current level.",
    },
    {
      title: "Practice advanced questions",
      detail:
        "Challenge yourself with difficult quantitative, logical reasoning, and verbal ability questions.",
    },
    {
      title: "Prepare with timed mock tests",
      detail:
        "Attempt placement-style mock tests under time limits to prepare for actual assessment conditions.",
    },
  ];
};

// CODING RECOMMENDATIONS
const getCodingRecommendations = () => {
  if (totalCoding === 0) {
    return [
      {
        title: "Start solving coding problems",
        detail:
          "You have not recorded any solved problems yet. Begin with basic programming questions involving numbers, loops, and conditions.",
      },
      {
        title: "Practice arrays and strings",
        detail:
          "Learn common operations on arrays and strings. These topics help build a strong problem-solving foundation.",
      },
      {
        title: "Create a daily coding habit",
        detail:
          "Start with one or two easy problems each day and focus on understanding the solution rather than rushing.",
      },
    ];
  }

  if (totalCoding < 20) {
    return [
      {
        title: "Build your problem-solving foundation",
        detail:
          `You have solved ${totalCoding} problems. Continue practicing basic programming, arrays, and strings.`,
      },
      {
        title: "Practice easy problems consistently",
        detail:
          "Try to solve at least two easy problems daily and review the solutions to questions you could not solve.",
      },
      {
        title: "Learn common patterns",
        detail:
          "Practice simple searching, sorting, and frequency-counting problems to improve your approach.",
      },
    ];
  }

  if (totalCoding < 40) {
    return [
      {
        title: "Expand your coding topics",
        detail:
          `You have solved ${totalCoding} problems. Strengthen your knowledge of arrays, strings, hashing, and binary search.`,
      },
      {
        title: "Begin medium-level problems",
        detail:
          "After understanding the basics, gradually attempt medium-level problems and learn different solution approaches.",
      },
      {
        title: "Review previous solutions",
        detail:
          "Revisit problems that took a long time to solve. Look for ways to improve time and space complexity.",
      },
    ];
  }

  if (totalCoding < 70) {
    return [
      {
        title: "Practice data structures",
        detail:
          `You have solved ${totalCoding} problems. Continue with linked lists, stacks, queues, trees, and hashing.`,
      },
      {
        title: "Improve your algorithm skills",
        detail:
          "Solve more medium-level problems involving recursion, searching, sorting, and common algorithmic patterns.",
      },
      {
        title: "Practice under time limits",
        detail:
          "Try timed coding sessions to improve your speed and prepare for technical placement assessments.",
      },
    ];
  }

  return [
    {
      title: "Explore advanced topics",
      detail:
        `You have solved ${totalCoding} problems. Challenge yourself with graph algorithms, dynamic programming, and advanced data structures.`,
    },
    {
      title: "Attempt difficult problems",
      detail:
        "Gradually increase the difficulty of your practice problems and compare different approaches to solving them.",
    },
    {
      title: "Simulate coding assessments",
      detail:
        "Practice multiple problems in a single timed session to prepare for technical interviews and coding rounds.",
    },
  ];
};

const aptitudeRecommendations = getAptitudeRecommendations();
const codingRecommendations = getCodingRecommendations();

  // Chart scale
  const maxCoding = Math.max(
    1,
    ...dailyActivity.map((day) => day.coding)
  );

  const maxTests = Math.max(
    1,
    ...dailyActivity.map((day) => day.tests)
  );

  if (loading) {
    return (
      <Layout>
        <div className="container-fluid mt-4">
          <p>Loading analytics...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-fluid mt-4 pb-5">
        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
          <div>
            <h1 className="mb-1">
              Weekly Analytics
            </h1>
            <p className="text-muted mb-0">
              Track coding and aptitude preparation.
            </p>
          </div>

          <button
            className="btn btn-outline-primary"
            onClick={fetchData}
          >
            Refresh
          </button>
        </div>

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        {/* WEEK SELECTOR */}
        <div className="card shadow-sm border-0 mb-4">
          <div className="card-body d-flex justify-content-between align-items-center flex-wrap gap-3">
            <button
              className="btn btn-outline-secondary"
              onClick={() =>
                setSelectedWeek(previousWeek)
              }
            >
              ← Previous week
            </button>

            <div className="text-center">
              <h5 className="mb-1">
                {formatDate(selectedWeek)} –{" "}
                {formatDate(addDays(selectedWeek, 6))}
              </h5>

              <small className="text-muted">
                {isCurrentWeek
                  ? "Current week"
                  : "Selected week"}
              </small>
            </div>

            <button
              className="btn btn-outline-secondary"
              onClick={() =>
                setSelectedWeek(nextWeek)
              }
              disabled={isCurrentWeek}
            >
              Next week →
            </button>
          </div>
        </div>

        {/* STATISTICS */}
        <div className="row g-3 mb-4">
          <MetricCard
            title="Coding This Week"
            value={weeklyCoding}
            subtitle={`${totalCoding} total problems solved`}
            color="#2563eb"
          />

          <MetricCard
            title="Aptitude Tests This Week"
            value={aptitudeInWeek.length}
            subtitle={`${totalAptitude} total attempts`}
            color="#0d9488"
          />

          <MetricCard
            title="Placement Readiness"
            value={`${readiness.toFixed(1)}%`}
            color="#d97706"
          />
        </div>

        {/* WEEKLY CALENDAR */}
        <div className="card shadow-sm border-0 mb-4">
          <div className="card-body p-4">
            <h4 className="mb-1">
              Weekly Activity Calendar
            </h4>

            <p className="text-muted small mb-4">
              Coding problems and aptitude tests by day
            </p>

            <div className="row g-2">
              {dailyActivity.map((day, index) => (
                <div
                  className="col-6 col-md"
                  key={index}
                >
                  <div
                    className="border rounded-3 p-2 text-center h-100"
                    style={{
                      background: sameDay(
                        day.date,
                        new Date()
                      )
                        ? "#f0f9ff"
                        : "#fff",
                      borderColor: sameDay(
                        day.date,
                        new Date()
                      )
                        ? "#93c5fd"
                        : "#e5e7eb",
                    }}
                  >
                    <div className="fw-semibold small">
                      {day.label}
                    </div>

                    <div className="text-muted small mb-2">
                      {formatDate(day.date)}
                    </div>

                    {/* CODING */}
                    <div
                      className="rounded-2 mb-2 p-2"
                      style={{
                        background: "#eff6ff",
                      }}
                    >
                      <div
                        className="fw-bold"
                        style={{
                          color: "#2563eb",
                        }}
                      >
                        {day.coding}
                      </div>

                      <small className="text-muted">
                        Coding
                      </small>

                      <div
                        className="rounded mt-2 mx-auto"
                        style={{
                          height: "5px",
                          width: "100%",
                          maxWidth: "65px",
                          background: "#dbeafe",
                        }}
                      >
                        <div
                          style={{
                            height: "5px",
                            width: `${
                              (day.coding / maxCoding) *
                              100
                            }%`,
                            background: "#2563eb",
                            borderRadius: "5px",
                          }}
                        />
                      </div>
                    </div>

                    {/* APTITUDE */}
                    <div
                      className="rounded-2 p-2"
                      style={{
                        background: "#f0fdfa",
                      }}
                    >
                      <div
                        className="fw-bold"
                        style={{
                          color: "#0d9488",
                        }}
                      >
                        {day.tests}
                      </div>

                      <small className="text-muted">
                        Aptitude
                      </small>

                      <div
                        className="rounded mt-2 mx-auto"
                        style={{
                          height: "5px",
                          width: "100%",
                          maxWidth: "65px",
                          background: "#ccfbf1",
                        }}
                      >
                        <div
                          style={{
                            height: "5px",
                            width: `${
                              (day.tests / maxTests) *
                              100
                            }%`,
                            background: "#0d9488",
                            borderRadius: "5px",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="d-flex flex-wrap gap-3 mt-3 small text-muted">
              <span>
                <span
                  className="d-inline-block rounded me-1"
                  style={{
                    width: 10,
                    height: 10,
                    background: "#2563eb",
                  }}
                />
                Coding problems
              </span>

              <span>
                <span
                  className="d-inline-block rounded me-1"
                  style={{
                    width: 10,
                    height: 10,
                    background: "#0d9488",
                  }}
                />
                Aptitude tests
              </span>
            </div>
          </div>
        </div>

{/* PERSONALIZED RECOMMENDATIONS */}
<div className="card shadow-sm border-0 mb-4">
  <div className="card-body p-4">
    <h4 className="mb-1">Personalized Recommendations</h4>

    <p className="text-muted small mb-4">
      Suggestions based on your aptitude and coding performance
    </p>

    <div className="row g-4">
      {/* APTITUDE RECOMMENDATIONS */}
      <div className="col-md-6">
        <div className="border rounded-3 h-100 p-3">
          <h5 className="text-success mb-3">
            Aptitude Recommendations
          </h5>

          {aptitudeRecommendations.map((item, index) => (
            <div
              key={item.title}
              className="rounded-3 p-3 mb-3"
              style={{
                background: "#f0fdfa",
                border: "1px solid #ccfbf1",
              }}
            >
              <div className="text-success fw-bold mb-2">
                0{index + 1}
              </div>

              <h6>{item.title}</h6>

              <p className="text-muted small mb-0">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CODING RECOMMENDATIONS */}
      <div className="col-md-6">
        <div className="border rounded-3 h-100 p-3">
          <h5 className="text-primary mb-3">
            Coding Recommendations
          </h5>

          {codingRecommendations.map((item, index) => (
            <div
              key={item.title}
              className="rounded-3 p-3 mb-3"
              style={{
                background: "#eff6ff",
                border: "1px solid #dbeafe",
              }}
            >
              <div className="text-primary fw-bold mb-2">
                0{index + 1}
              </div>

              <h6>{item.title}</h6>

              <p className="text-muted small mb-0">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</div>

   
      </div>
    </Layout>
  );
}

// Reusable statistic card
function MetricCard({
  title,
  value,
  subtitle,
  color,
}) {
  return (
    <div className="col-sm-6 col-xl-4">
      <div className="card shadow-sm border-0 h-100">
        <div className="card-body p-4">
          <div
            className="mb-2"
            style={{
              width: "38px",
              height: "4px",
              borderRadius: "5px",
              background: color,
            }}
          />

          <p className="text-muted mb-1">
            {title}
          </p>

          <h2
            className="mb-1"
            style={{ color }}
          >
            {value}
          </h2>

          <small className="text-muted">
            {subtitle}
          </small>
        </div>
      </div>
    </div>
  );
}

export default Analytics;