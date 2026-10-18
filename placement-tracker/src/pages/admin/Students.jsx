import { useEffect, useState } from "react";
import axios from "axios";

function Students() {

  const [students, setStudents] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");


  useEffect(() => {
    fetchStudents();
  }, []);


  // ==========================================
  // FETCH STUDENTS
  // ==========================================

  const fetchStudents = async () => {

    try {

      const res = await axios.get(
        "/api/admin/students",
        {
          headers: {
            Authorization:
              localStorage.getItem("token"),
          },
        }
      );

      setStudents(res.data);

    } catch (error) {

      console.log(error);

      if (error.response?.status === 403) {
        alert("Admin access required.");
      } else {
        alert("Unable to load students.");
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


  // ==========================================
  // FILTER STUDENTS
  // ==========================================

  const filteredStudents =
    students.filter((student) => {

      const name =
        student.name?.toLowerCase() || "";

      const email =
        student.email?.toLowerCase() || "";

      const searchText =
        search.toLowerCase();

      return (
        name.includes(searchText) ||
        email.includes(searchText)
      );

    });


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (
      <div className="container mt-5 text-center">

        <h4>
          Loading Students...
        </h4>

      </div>
    );

  }


  return (

    <div
  className="container-fluid bg-light p-0"
  style={{
    height: "100%",
    overflow: "hidden",
    boxSizing: "border-box",
  }}
>



      {/* ====================================== */}
      {/* CONTENT */}
      {/* ====================================== */}

      <div
  className="container-fluid px-4 py-3"
  style={{ boxSizing: "border-box" }}
>


        {/* BACK BUTTON */}

        <button
          className="btn btn-secondary mb-4"
          onClick={() =>
            (window.location.href = "/admin")
          }
        >
          ← Back to Admin Dashboard
        </button>


        {/* TITLE */}

        <div className="mb-4">

          <h1 className="fw-bold">
            Student Management
          </h1>

          <p className="text-muted">
            View and manage registered students.
          </p>

        </div>


        {/* ====================================== */}
        {/* SEARCH + COUNT */}
        {/* ====================================== */}

        <div className="card shadow-sm border-0 mb-4">

          <div className="card-body">

            <div className="row align-items-center">

              <div className="col-md-8">

                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by student name or email..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                />

              </div>


              <div className="col-md-4 mt-3 mt-md-0">

                <div className="text-md-end">

                  <strong>
                    Total Students:
                  </strong>{" "}

                  {students.length}

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* ====================================== */}
        {/* STUDENT TABLE */}
        {/* ====================================== */}

        <div className="card shadow-sm border-0">

          <div className="card-body p-0">

            {filteredStudents.length === 0 ? (

              <div className="p-5 text-center">

                <h5>
                  No students found
                </h5>

                <p className="text-muted mb-0">
                  Try a different search.
                </p>

              </div>

            ) : (

              <div className="table-responsive">

                <table className="table table-hover mb-0">

                  <thead className="table-dark">

                    <tr>

                      <th>
                        #
                      </th>

                      <th>
                        Student Name
                      </th>

                      <th>
                        Email
                      </th>

                      <th>
                        Registered
                      </th>

                      <th>
                        Role
                      </th>

                      <th>
                        Action
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {filteredStudents.map(
                      (student, index) => (

                        <tr key={student._id}>

                          <td>
                            {index + 1}
                          </td>

                          <td>
                            <strong>
                              {student.name}
                            </strong>
                          </td>

                          <td>
                            {student.email}
                          </td>

                          <td>
                            {student.createdAt
                              ? new Date(
                                  student.createdAt
                                ).toLocaleDateString()
                              : "N/A"}
                          </td>

                          <td>

                            <span className="badge bg-primary">
                              Student
                            </span>

                          </td>

                          <td>

                            <button
                              className="btn btn-sm btn-primary"
                              onClick={() =>
                                (window.location.href =
                                  `/admin/students/${student._id}`)
                              }
                            >
                              View Profile
                            </button>

                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              </div>

            )}

          </div>

        </div>

      </div>

    </div>

  );
}

export default Students;