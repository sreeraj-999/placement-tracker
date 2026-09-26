import { useEffect, useState } from "react";
import axios from "axios";

function AdminCompanies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [companyName, setCompanyName] = useState("");

  const [selectedCompany, setSelectedCompany] = useState(null);
  const [pdfs, setPdfs] = useState([]);
  const [pdfLoading, setPdfLoading] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const token = localStorage.getItem("token");

  const headers = {
    Authorization: token,
  };

  // =========================
  // FETCH COMPANIES
  // =========================

  const fetchCompanies = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/companies",
        {
          headers,
        }
      );

      setCompanies(response.data);
    } catch (error) {
      console.log("Error fetching companies:", error);

      alert(
        error.response?.data?.message ||
          "Failed to load companies"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  // =========================
  // ADD / EDIT COMPANY
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!companyName.trim()) {
      alert("Please enter company name.");
      return;
    }

    try {
      if (editingId) {
        // EDIT COMPANY
        await axios.put(
          `http://localhost:5000/api/companies/${editingId}`,
          {
            name: companyName.trim(),
          },
          {
            headers,
          }
        );

        alert("Company updated successfully.");
      } else {
        // CREATE FOLDER NAME AUTOMATICALLY
        const generatedFolderName = companyName
          .trim()
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");

        // ADD COMPANY
        await axios.post(
          "http://localhost:5000/api/companies",
          {
            name: companyName.trim(),
            folderName: generatedFolderName,
          },
          {
            headers,
          }
        );

        alert("Company added successfully.");
      }

      resetForm();
      fetchCompanies();
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  // =========================
  // RESET FORM
  // =========================

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setCompanyName("");
  };

  // =========================
  // EDIT
  // =========================

  const handleEdit = (company) => {
    setEditingId(company._id);
    setCompanyName(company.name || "");
    setShowForm(true);
  };

  // =========================
  // DELETE COMPANY
  // =========================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this company?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:5000/api/companies/${id}`,
        {
          headers,
        }
      );

      alert(
        "Company deleted successfully. Existing PDF files were kept."
      );

      if (selectedCompany?._id === id) {
        setSelectedCompany(null);
        setPdfs([]);
      }

      fetchCompanies();
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to delete company"
      );
    }
  };

  // =========================
  // VIEW PAPERS
  // =========================

  const viewPapers = async (company) => {
    setSelectedCompany(company);
    setPdfLoading(true);
    setPdfs([]);
    setSelectedFile(null);

    try {
      const response = await axios.get(
        `http://localhost:5000/api/companies/${company.folderName}/pdfs`,
        {
          headers,
        }
      );

      setPdfs(response.data);
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to load papers"
      );
    } finally {
      setPdfLoading(false);
    }
  };

  // =========================
  // FILE SELECT
  // =========================

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    if (
      file.type !== "application/pdf" &&
      !file.name.toLowerCase().endsWith(".pdf")
    ) {
      alert("Only PDF files are allowed.");

      e.target.value = "";
      setSelectedFile(null);

      return;
    }

    setSelectedFile(file);
  };

  // =========================
  // UPLOAD PDF
  // =========================

  const handleUpload = async () => {
    if (!selectedCompany) {
      alert("Please select a company.");
      return;
    }

    if (!selectedFile) {
      alert("Please select a PDF file.");
      return;
    }

    const data = new FormData();

    data.append("pdf", selectedFile);

    try {
      setUploading(true);

      await axios.post(
        `http://localhost:5000/api/companies/${selectedCompany.folderName}/pdf`,
        data,
        {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("PDF uploaded successfully.");

      setSelectedFile(null);

      const fileInput =
        document.getElementById("pdf-upload");

      if (fileInput) {
        fileInput.value = "";
      }

      viewPapers(selectedCompany);
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to upload PDF"
      );
    } finally {
      setUploading(false);
    }
  };

  // =========================
  // DELETE PDF
  // =========================

  const handleDeletePDF = async (pdf) => {
    if (!selectedCompany) {
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${pdf.title}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:5000/api/companies/${selectedCompany.folderName}/pdf/${encodeURIComponent(
          pdf.fileName
        )}`,
        {
          headers,
        }
      );

      alert("PDF deleted successfully.");

      viewPapers(selectedCompany);
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to delete PDF"
      );
    }
  };

  return (
    <div>
      {/* =========================
          HEADER
      ========================= */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: "32px",
            }}
          >
            COMPANIES
          </h1>

          <p
            style={{
              color: "#64748b",
              marginTop: "8px",
            }}
          >
            Manage placement companies and question papers.
          </p>
        </div>

        <button
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
            setCompanyName("");
          }}
          style={buttonStyle("#e20505")}
        >
          + ADD COMPANY
        </button>
      </div>

      {/* =========================
          ADD / EDIT COMPANY
      ========================= */}

      {showForm && (
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "25px",
            borderRadius: "10px",
            marginBottom: "30px",
            boxShadow:
              "0 2px 10px rgba(0,0,0,0.08)",
          }}
        >
          <h2>
            {editingId
              ? "EDIT COMPANY"
              : "ADD COMPANY"}
          </h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Company Name"
              value={companyName}
              onChange={(e) =>
                setCompanyName(e.target.value)
              }
              required
              style={inputStyle}
            />

            <div
              style={{
                marginTop: "20px",
                display: "flex",
                gap: "10px",
              }}
            >
              <button
                type="submit"
                style={buttonStyle("#16a34a")}
              >
                {editingId
                  ? "UPDATE COMPANY"
                  : "ADD COMPANY"}
              </button>

              <button
                type="button"
                onClick={resetForm}
                style={buttonStyle("#64748b")}
              >
                CANCEL
              </button>
            </div>
          </form>
        </div>
      )}

      {/* =========================
          COMPANY LIST
      ========================= */}

      {loading ? (
        <p>Loading companies...</p>
      ) : companies.length === 0 ? (
        <p>No companies available.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {companies.map((company) => (
            <div
              key={company._id}
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "10px",
                padding: "25px",
                boxShadow:
                  "0 2px 10px rgba(0,0,0,0.08)",
                textAlign: "center",
              }}
            >
              {/* ONLY COMPANY NAME */}

              <h2
                style={{
                  margin: 0,
                  fontSize: "28px",
                }}
              >
                {company.name}
              </h2>

              {/* BUTTONS */}

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "8px",
                  flexWrap: "wrap",
                  marginTop: "20px",
                }}
              >
                <button
                  onClick={() =>
                    viewPapers(company)
                  }
                  style={buttonStyle("#2563eb")}
                >
                  PAPERS
                </button>

                <button
                  onClick={() =>
                    handleEdit(company)
                  }
                  style={buttonStyle("#f59e0b")}
                >
                  EDIT
                </button>

                <button
                  onClick={() =>
                    handleDelete(company._id)
                  }
                  style={buttonStyle("#dc2626")}
                >
                  DELETE
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* =========================
          PAPERS MANAGEMENT
      ========================= */}

      {selectedCompany && (
        <div
          style={{
            marginTop: "35px",
            backgroundColor: "#ffffff",
            padding: "25px",
            borderRadius: "10px",
            boxShadow:
              "0 2px 10px rgba(0,0,0,0.08)",
          }}
        >
          {/* HEADER */}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "15px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                }}
              >
                {selectedCompany.name} - QUESTION PAPERS
              </h2>

              <p
                style={{
                  color: "#64748b",
                  marginBottom: 0,
                }}
              >
                Manage previous placement question papers.
              </p>
            </div>

            <button
              onClick={() => {
                setSelectedCompany(null);
                setPdfs([]);
                setSelectedFile(null);
              }}
              style={buttonStyle("#64748b")}
            >
              CLOSE
            </button>
          </div>

          {/* =========================
              UPLOAD PDF
          ========================= */}

          <div
            style={{
              marginTop: "25px",
              padding: "20px",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              backgroundColor: "#f8fafc",
            }}
          >
            <h3
              style={{
                marginTop: 0,
              }}
            >
              ADD QUESTION PAPER
            </h3>

            <div
              style={{
                display: "flex",
                gap: "12px",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <input
                id="pdf-upload"
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleFileChange}
              />

              <button
                onClick={handleUpload}
                disabled={
                  uploading || !selectedFile
                }
                style={{
                  ...buttonStyle("#16a34a"),
                  opacity:
                    uploading || !selectedFile
                      ? 0.6
                      : 1,
                  cursor:
                    uploading || !selectedFile
                      ? "not-allowed"
                      : "pointer",
                }}
              >
                {uploading
                  ? "UPLOADING..."
                  : "UPLOAD PDF"}
              </button>
            </div>

            {selectedFile && (
              <p
                style={{
                  marginBottom: 0,
                  marginTop: "12px",
                  color: "#475569",
                }}
              >
                Selected:{" "}
                <strong>
                  {selectedFile.name}
                </strong>
              </p>
            )}
          </div>

          {/* =========================
              EXISTING PDFs
          ========================= */}

          <div
            style={{
              marginTop: "25px",
            }}
          >
            <h3>
              EXISTING QUESTION PAPERS
            </h3>

            {pdfLoading ? (
              <p>Loading papers...</p>
            ) : pdfs.length === 0 ? (
              <p>
                No PDF papers found for this company.
              </p>
            ) : (
              <div
                style={{
                  display: "grid",
                  gap: "12px",
                }}
              >
                {pdfs.map((pdf) => (
                  <div
                    key={pdf.fileName}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "15px",
                      padding: "15px",
                      border:
                        "1px solid #e2e8f0",
                      borderRadius: "7px",
                      flexWrap: "wrap",
                    }}
                  >
                    <span>
                      📄 {pdf.title}
                    </span>

                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                      }}
                    >
                      <a
                        href={`http://localhost:5000${pdf.url}`}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          textDecoration: "none",
                          backgroundColor: "#2563eb",
                          color: "#ffffff",
                          padding: "8px 14px",
                          borderRadius: "5px",
                          fontSize: "13px",
                        }}
                      >
                        OPEN
                      </a>

                      <button
                        onClick={() =>
                          handleDeletePDF(pdf)
                        }
                        style={buttonStyle("#dc2626")}
                      >
                        DELETE
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// =========================
// STYLES
// =========================

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "12px",
  border: "1px solid #cbd5e1",
  borderRadius: "6px",
  fontSize: "14px",
  outline: "none",
};

const buttonStyle = (backgroundColor) => ({
  backgroundColor,
  color: "#ffffff",
  border: "none",
  padding: "9px 14px",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "12px",
  fontWeight: "600",
});

export default AdminCompanies;