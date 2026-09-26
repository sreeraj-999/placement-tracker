import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";
import "./CompanyPreparation.css";

function CompanyPreparation() {
  const navigate = useNavigate();

  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:5000/api/companies", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setCompanies(res.data);
        setFilteredCompanies(res.data);
      })
      .catch((error) => {
        console.log("Error fetching companies:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // SEARCH
  useEffect(() => {
    const value = search.toLowerCase().trim();

    if (!value) {
      setFilteredCompanies(companies);
      return;
    }

    const filtered = companies.filter((company) =>
      company.name.toLowerCase().includes(value)
    );

    setFilteredCompanies(filtered);
  }, [search, companies]);

  return (
    <Layout>
      <div className="company-page">

        {/* HEADER */}

        <div className="company-header">
          <div>
            <h1>Company Preparation</h1>

            <p>
              Practice with previous placement question papers
            </p>
          </div>

          <div className="company-count">
            {companies.length} Companies
          </div>
        </div>

        {/* SEARCH */}

        <div className="company-search">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* COMPANY LIST */}

        {loading ? (
          <div className="company-message">
            Loading companies...
          </div>
        ) : filteredCompanies.length === 0 ? (
          <div className="company-message">
            No companies found.
          </div>
        ) : (
          <div className="company-grid">
            {filteredCompanies.map((company) => (
              <div
                className="company-card"
                key={company._id}
                onClick={() =>
                  navigate(
                    `/company/${company.folderName}`
                  )
                }
              >
                <div className="company-icon">
                  {company.name
                    ? company.name.charAt(0).toUpperCase()
                    : "C"}
                </div>

                <h2>{company.name}</h2>

                <button
                  onClick={(e) => {
                    e.stopPropagation();

                    navigate(
                      `/company/${company.folderName}`
                    );
                  }}
                >
                  VIEW PAPERS
                  <span>→</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default CompanyPreparation;