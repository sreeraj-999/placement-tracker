import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function StudentDetails() {

  const { id } = useParams();

  const [student, setStudent] = useState(null);

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchStudent();
  }, [id]);


  // ==========================================
  // FETCH STUDENT
  // ==========================================

  const fetchStudent = async () => {

    try {

      const res = await axios.get(
        `/api/admin/students/${id}`,
        {
          headers: {
            Authorization:
              localStorage.getItem("token"),
          },
        }
      );

      setStudent(res.data);

    } catch (error) {

      console.log(error);

      if (error.response?.status === 403) {
        alert("Admin access required.");
      } else {
        alert("Unable to load student profile.");
      }

    } finally {

      setLoading(false);

    }
  };


  // ==========================================
  // LOGOUT
  // ==========================================

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");

    window.location.href = "/login";
  };


  if (loading) {

    return (
      <div className="container mt-5 text-center">

        <h4>
          Loading Student Profile...
        </h4>

      </div>
    );

  }


  if (!student) {

    return (
      <div className="container mt-5 text-center">

        <h4>
          Student not found.
        </h4>

        <button
          className="btn btn-secondary mt-3"
          onClick={() =>
            (window.location.href =
              "/admin/students")
          }
        >
          Back to Students
        </button>

      </div>
    );

  }


  return (

    <div className="container-fluid min-vh-100 bg-light p-0">


      {/* ====================================== */}
      {/* CONTENT */}
      {/* ====================================== */}

      <div className="container py-4">


        <button
          className="btn btn-secondary mb-4"
          onClick={() =>
            (window.location.href =
              "/admin/students")
          }
        >
          ← Back to Students
        </button>


        <h1 className="fw-bold mb-4">
          Student Profile
        </h1>


        {/* ====================================== */}
        {/* PROFILE */}
        {/* ====================================== */}

        <div className="card shadow-sm border-0 mb-4">

          <div className="card-body p-4">

            <div className="row">


              <div className="col-md-6">

                <h5 className="text-muted">
                  Student Name
                </h5>

                <h3 className="fw-bold mb-4">
                  {student.name}
                </h3>


                <h5 className="text-muted">
                  Email
                </h5>

                <p className="fs-5 mb-4">
                  {student.email}
                </p>


                <h5 className="text-muted">
                  Account Type
                </h5>

                <span className="badge bg-primary fs-6">
                  Student
                </span>

              </div>


              <div className="col-md-6">

                <h5 className="text-muted">
                  User ID
                </h5>

                <p className="text-break">
                  {student._id}
                </p>


                <h5 className="text-muted">
                  Registered On
                </h5>

                <p className="fs-5">

                  {student.createdAt
                    ? new Date(
                        student.createdAt
                      ).toLocaleDateString()
                    : "N/A"}

                </p>


                <h5 className="text-muted">
                  Last Updated
                </h5>

                <p className="fs-5">

                  {student.updatedAt
                    ? new Date(
                        student.updatedAt
                      ).toLocaleDateString()
                    : "N/A"}

                </p>

              </div>

            </div>

          </div>

        </div>


        {/* ====================================== */}
        {/* PREPARATION INFORMATION */}
        {/* ====================================== */}

        <div className="row g-4">


          <div className="col-md-4">

            <div className="card shadow-sm border-0 h-100">

              <div className="card-body">

                <h5 className="fw-bold">
                  Coding Progress
                </h5>

                <p className="text-muted">
                  Student coding and LeetCode
                  information will be displayed
                  here.
                </p>

                <span className="badge bg-secondary">
                  Coming Next
                </span>

              </div>

            </div>

          </div>


          <div className="col-md-4">

            <div className="card shadow-sm border-0 h-100">

              <div className="card-body">

                <h5 className="fw-bold">
                  Aptitude Performance
                </h5>

                <p className="text-muted">
                  Student aptitude test scores
                  will be displayed here.
                </p>

                <span className="badge bg-secondary">
                  Coming Next
                </span>

              </div>

            </div>

          </div>


          <div className="col-md-4">

            <div className="card shadow-sm border-0 h-100">

              <div className="card-body">

                <h5 className="fw-bold">
                  Resume & Readiness
                </h5>

                <p className="text-muted">
                  Resume score and placement
                  readiness information will be
                  displayed here.
                </p>

                <span className="badge bg-secondary">
                  Coming Next
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}

export default StudentDetails;