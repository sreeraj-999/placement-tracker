import { useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

function Aptitude() {
  const [page, setPage] = useState("start");
  const [category, setCategory] = useState(null);

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  const [completedTests, setCompletedTests] = useState({
    quantitative: false,
    logical: false,
    verbal: false,
  });

  const [scores, setScores] = useState({
    quantitative: 0,
    logical: 0,
    verbal: 0,
  });

  const [totalQuestionsByCategory, setTotalQuestionsByCategory] =
    useState({
      quantitative: 0,
      logical: 0,
      verbal: 0,
    });

  const [loading, setLoading] = useState(false);

  const startCategory = async (selectedCategory) => {
    if (completedTests[selectedCategory]) return;

    if (
      selectedCategory === "logical" &&
      !completedTests.quantitative
    ) {
      alert("Complete Quantitative Aptitude first.");
      return;
    }

    if (
      selectedCategory === "verbal" &&
      !completedTests.logical
    ) {
      alert("Complete Logical Reasoning first.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.get(
        `/api/questions/${selectedCategory}`
      );

      if (!res.data || res.data.length === 0) {
        alert("No questions available for this category.");
        return;
      }

      setQuestions(res.data);
      setCategory(selectedCategory);
      setCurrentQuestion(0);
      setAnswers({});
      setPage("test");

    } catch (error) {
      console.log(error);
      alert("Unable to load questions.");

    } finally {
      setLoading(false);
    }
  };

  const selectAnswer = (answer) => {
    setAnswers({
      ...answers,
      [currentQuestion]: answer,
    });
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const completeCategory = async () => {
    try {
      if (Object.keys(answers).length < questions.length) {
        alert("Please answer all questions before completing.");
        return;
      }

      setLoading(true);

      const formattedAnswers = questions.map(
        (question, index) => ({
          questionId: question._id,
          selectedAnswer: answers[index],
        })
      );

      const res = await axios.post(
        `/api/questions/submit/${category}`,
        {
          answers: formattedAnswers,
        }
      );

      const result = res.data;

      setScores((prev) => ({
        ...prev,
        [category]: result.score,
      }));

      setTotalQuestionsByCategory((prev) => ({
        ...prev,
        [category]: result.totalQuestions,
      }));

      setCompletedTests((prev) => ({
        ...prev,
        [category]: true,
      }));

      setPage("categories");

    } catch (error) {
      console.log(error);
      alert("Unable to submit answers.");

    } finally {
      setLoading(false);
    }
  };

  const showFinalResult = async () => {
    const totalScore =
      scores.quantitative +
      scores.logical +
      scores.verbal;

    const totalQuestions =
      totalQuestionsByCategory.quantitative +
      totalQuestionsByCategory.logical +
      totalQuestionsByCategory.verbal;

    const percentage =
      totalQuestions > 0
        ? (totalScore / totalQuestions) * 100
        : 0;

    try {
      setLoading(true);

      await axios.post(
        "/api/aptitude/add",
        {
          category: "Overall Aptitude Test",
          score: totalScore,
          totalQuestions,
          percentage,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      setPage("result");

    } catch (error) {
      console.log(error);
      alert("Unable to save aptitude result.");

    } finally {
      setLoading(false);
    }
  };

  const restartTest = () => {
    setPage("start");
    setCategory(null);
    setQuestions([]);
    setCurrentQuestion(0);
    setAnswers({});

    setCompletedTests({
      quantitative: false,
      logical: false,
      verbal: false,
    });

    setScores({
      quantitative: 0,
      logical: 0,
      verbal: 0,
    });

    setTotalQuestionsByCategory({
      quantitative: 0,
      logical: 0,
      verbal: 0,
    });
  };

  // START PAGE
  if (page === "start") {
    return (
      <Layout>
        <div className="container mt-5">
          <div className="card shadow p-5 text-center">

            <h1 className="mb-3">
               Aptitude Assessment
            </h1>

            <p className="text-muted fs-5">
              Test your placement aptitude skills in
              Quantitative Aptitude, Logical Reasoning
              and Verbal Ability.
            </p>

            <div className="mt-4 mb-4">
              <p>Random Questions</p>
              <p>3 Categories</p>
              <p>One Final Score</p>
            </div>

            <button
              className="btn btn-primary btn-lg px-5"
              onClick={() => setPage("categories")}
            >
              Start Test
            </button>

          </div>
        </div>
      </Layout>
    );
  }

  // CATEGORY PAGE
  if (page === "categories") {
    const allCompleted =
      completedTests.quantitative &&
      completedTests.logical &&
      completedTests.verbal;

    return (
      <Layout>
        <div className="container mt-4">

          <h1>Aptitude Assessment</h1>

          <p className="text-muted mb-4">
            Complete all three sections to unlock your final aptitude score.
          </p>

          <div className="row g-4">

            <div className="col-md-4">
              <div className="card shadow h-100 p-4 text-center">

                
                <h4>Quantitative Aptitude</h4>

                <p className="text-muted">
                  Mathematical and numerical problems.
                </p>

                {completedTests.quantitative ? (
                  <>
                    <h5 className="text-success">
                      ✓ Completed
                    </h5>

                    <p>
                      Score: {scores.quantitative} /{" "}
                      {totalQuestionsByCategory.quantitative}
                    </p>
                  </>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      startCategory("quantitative")
                    }
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Start Test"}
                  </button>
                )}

              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow h-100 p-4 text-center">

          
                <h4>Logical Reasoning</h4>

                <p className="text-muted">
                  Patterns, sequences and reasoning.
                </p>

                {completedTests.logical ? (
                  <>
                    <h5 className="text-success">
                      ✓ Completed
                    </h5>

                    <p>
                      Score: {scores.logical} /{" "}
                      {totalQuestionsByCategory.logical}
                    </p>
                  </>
                ) : (
                  <button
                    className={
                      completedTests.quantitative
                        ? "btn btn-primary"
                        : "btn btn-secondary"
                    }
                    onClick={() =>
                      startCategory("logical")
                    }
                    disabled={
                      !completedTests.quantitative ||
                      loading
                    }
                  >
                    {completedTests.quantitative
                      ? "Start Test"
                      : "🔒 Locked"}
                  </button>
                )}

              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow h-100 p-4 text-center">

              
                <h4>Verbal Ability</h4>

                <p className="text-muted">
                  Grammar, vocabulary and English.
                </p>

                {completedTests.verbal ? (
                  <>
                    <h5 className="text-success">
                      ✓ Completed
                    </h5>

                    <p>
                      Score: {scores.verbal} /{" "}
                      {totalQuestionsByCategory.verbal}
                    </p>
                  </>
                ) : (
                  <button
                    className={
                      completedTests.logical
                        ? "btn btn-primary"
                        : "btn btn-secondary"
                    }
                    onClick={() =>
                      startCategory("verbal")
                    }
                    disabled={
                      !completedTests.logical ||
                      loading
                    }
                  >
                    {completedTests.logical
                      ? "Start Test"
                      : "🔒Locked"}
                  </button>
                )}

              </div>
            </div>

          </div>

          {allCompleted && (
            <div className="text-center mt-5">

              <button
                className="btn btn-success btn-lg px-5"
                onClick={showFinalResult}
                disabled={loading}
              >
                {loading
                  ? "Saving Result..."
                  : "View Final Result"}
              </button>

            </div>
          )}

        </div>
      </Layout>
    );
  }

  // FINAL RESULT PAGE
  if (page === "result") {
    const totalScore =
      scores.quantitative +
      scores.logical +
      scores.verbal;

    const totalQuestions =
      totalQuestionsByCategory.quantitative +
      totalQuestionsByCategory.logical +
      totalQuestionsByCategory.verbal;

    const percentage =
      totalQuestions > 0
        ? (totalScore / totalQuestions) * 100
        : 0;

    return (
      <Layout>
        <div className="container mt-5">

          <div className="card shadow p-5 text-center">

            <h1>Assessment Completed!</h1>

            <p className="text-muted">
              Here is your complete aptitude test result.
            </p>

            <div className="row mt-5 mb-4">

              <div className="col-md-4">
                <div className="card p-3">
                  <h5>Quantitative</h5>
                  <h2>
                    {scores.quantitative}/
                    {totalQuestionsByCategory.quantitative}
                  </h2>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card p-3">
                  <h5>Logical</h5>
                  <h2>
                    {scores.logical}/
                    {totalQuestionsByCategory.logical}
                  </h2>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card p-3">
                  <h5>Verbal</h5>
                  <h2>
                    {scores.verbal}/
                    {totalQuestionsByCategory.verbal}
                  </h2>
                </div>
              </div>

            </div>

            <hr />

            <h3>Overall Aptitude Score</h3>

            <h1 className="display-3 text-primary">
              {totalScore} / {totalQuestions}
            </h1>

            <h2 className="text-success">
              {percentage.toFixed(1)}%
            </h2>

            <button
              className="btn btn-primary mt-4"
              onClick={restartTest}
            >
              Take Test Again
            </button>

          </div>

        </div>
      </Layout>
    );
  }

  // QUESTION PAGE
  const question = questions[currentQuestion];

  if (!question) {
    return (
      <Layout>
        <div className="container mt-5 text-center">
          <h3>Loading Questions...</h3>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>

      <div className="container mt-4">

        <h2>
          {category === "quantitative" &&
            "Quantitative Aptitude"}

          {category === "logical" &&
            "Logical Reasoning"}

          {category === "verbal" &&
            "Verbal Ability"}
        </h2>

        <p className="text-muted">
          Question {currentQuestion + 1} of {questions.length}
        </p>

        <div className="progress mb-4">
          <div
            className="progress-bar"
            style={{
              width: `${
                ((currentQuestion + 1) / questions.length) * 100
              }%`,
            }}
          />
        </div>

        <div className="card shadow p-4">

          <h4 className="mb-4">
            {currentQuestion + 1}. {question.question}
          </h4>

          <div className="d-grid gap-3">

            {question.options.map((option) => (

              <button
                key={option}
                className={
                  answers[currentQuestion] === option
                    ? "btn btn-primary text-start p-3"
                    : "btn btn-outline-secondary text-start p-3"
                }
                onClick={() =>
                  selectAnswer(option)
                }
              >
                {option}
              </button>

            ))}

          </div>

          <div className="d-flex justify-content-between mt-5">

            <button
              className="btn btn-secondary"
              onClick={previousQuestion}
              disabled={currentQuestion === 0}
            >
              ← Previous
            </button>

            {currentQuestion === questions.length - 1 ? (

              <button
                className="btn btn-success"
                onClick={completeCategory}
                disabled={loading}
              >
                {loading
                  ? "Submitting..."
                  : "Complete Section ✓"}
              </button>

            ) : (

              <button
                className="btn btn-primary"
                onClick={nextQuestion}
              >
                Next →
              </button>

            )}

          </div>

        </div>

      </div>

    </Layout>
  );
}

export default Aptitude;