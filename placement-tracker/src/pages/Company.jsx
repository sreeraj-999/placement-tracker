import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

function Company() {
  const [companyName, setCompanyName] = useState("");
  const [aptitude, setAptitude] = useState(false);
  const [coding, setCoding] = useState(false);
  const [interview, setInterview] = useState(false);

  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/company",
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      setCompanies(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addCompany = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/company/add",
        {
          companyName,
          aptitude,
          coding,
          interview,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      setCompanyName("");
      setAptitude(false);
      setCoding(false);
      setInterview(false);

      fetchCompanies();

      alert("Company Added Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCompany = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/company/${id}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      fetchCompanies();

      alert("Company Deleted Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container-fluid mt-4">

        <h1 className="mb-4">
          Company Preparation Tracker
        </h1>

        <div className="card shadow p-4 mb-4">

          <input
            className="form-control mb-3"
            placeholder="Company Name"
            value={companyName}
            onChange={(e) =>
              setCompanyName(e.target.value)
            }
          />

          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              checked={aptitude}
              onChange={() =>
                setAptitude(!aptitude)
              }
            />
            <label className="form-check-label">
              Aptitude Completed
            </label>
          </div>

          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              checked={coding}
              onChange={() =>
                setCoding(!coding)
              }
            />
            <label className="form-check-label">
              Coding Completed
            </label>
          </div>

          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              checked={interview}
              onChange={() =>
                setInterview(!interview)
              }
            />
            <label className="form-check-label">
              Interview Prep Completed
            </label>
          </div>

          <button
            className="btn btn-primary"
            onClick={addCompany}
          >
            Add Company
          </button>

        </div>

        <div className="card shadow p-4">

          <h3>Company List</h3>

          {companies.map((company) => (
            <div
              key={company._id}
              className="border rounded p-3 mb-2"
            >
              <h5>{company.companyName}</h5>

              <p>
                Aptitude: {company.aptitude ? "✅" : "❌"}
              </p>

              <p>
                Coding: {company.coding ? "✅" : "❌"}
              </p>

              <p>
                Interview: {company.interview ? "✅" : "❌"}
              </p>

              <button
                className="btn btn-danger btn-sm"
                onClick={() =>
                  deleteCompany(company._id)
                }
              >
                Delete
              </button>
            </div>
          ))}

        </div>

      </div>
    </Layout>
  );
}

export default Company;