import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";
import "./CompanyPreparation.css";

function CompanyPDFs() {
  const { company } = useParams();

  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(
        `http://localhost:5000/api/companies/${company}/pdfs`,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        setPdfs(res.data);
      })
      .catch((error) => {
        console.log(
          "Error fetching question papers:",
          error
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [company]);

  return (
    <Layout>
      <div className="company-page">

        {/* BACK BUTTON */}

        <Link
          to="/company"
          className="back-btn"
        >
          ← Back to Companies
        </Link>

        {/* HEADER */}

        <div className="papers-header">
          <div>
            <h1>
              {company} Previous Papers
            </h1>

            <p>
              Previous placement question papers
            </p>
          </div>

          <div className="paper-count">
            {pdfs.length} Papers
          </div>
        </div>

        {/* PAPERS */}

        {loading ? (
          <div className="company-message">
            Loading question papers...
          </div>
        ) : pdfs.length === 0 ? (
          <div className="company-message">
            No previous question papers available
            for this company.
          </div>
        ) : (
          <div className="pdf-grid">

            {pdfs.map((pdf) => (
              <div
                className="pdf-card"
                key={pdf.fileName}
              >
                <div className="pdf-icon">
                  PDF
                </div>

                <div className="pdf-info">
                  <h3>{pdf.title}</h3>

                  <span>
                    Previous Question Paper
                  </span>
                </div>

                <a
                  href={`http://localhost:5000${pdf.url}`}
                  target="_blank"
                  rel="noreferrer"
                  className="pdf-open-btn"
                >
                  OPEN PDF
                  <span>↗</span>
                </a>
              </div>
            ))}

          </div>
        )}
      </div>
    </Layout>
  );
}

export default CompanyPDFs;