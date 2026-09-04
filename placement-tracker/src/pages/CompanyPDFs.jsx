import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";
import "./CompanyPreparation.css";

function CompanyPDFs() {

    const { company } = useParams();

    const [pdfs, setPdfs] = useState([]);

    useEffect(() => {

        axios
            .get(`/api/company-preparation/${company}`)
            .then((res) => setPdfs(res.data))
            .catch((err) => console.log(err));

    }, [company]);

    return (

        <Layout>

            <div className="company-page">

                <Link
                    to="/company"
                    className="back-btn"
                >
                    ← Back to Companies
                </Link>

                <h1>{company} Previous Papers</h1>

                <div className="pdf-grid">

                    {pdfs.length > 0 ? (

                        pdfs.map((pdf, index) => (

                            <div
                                key={index}
                                className="pdf-card"
                            >

                                <h3>{pdf.title}</h3>

                                <a
                                    href={`http://localhost:5000${pdf.url}`}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    📄 Open PDF
                                </a>

                            </div>

                        ))

                    ) : (

                        <p>No PDF files available for this company.</p>

                    )}

                </div>

            </div>

        </Layout>

    );

}

export default CompanyPDFs;