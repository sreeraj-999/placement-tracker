import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import "./CompanyPreparation.css";

function CompanyPreparation() {

    const navigate = useNavigate();

    const companies = [
        "TCS",
        "Infosys",
        "Wipro",
        "Accenture",
        "UST",
        "Cognizant",
        "IBM",
        "EY"
    ];

    return (

        <Layout>

            <div className="company-page">

                <h1>Company Preparation Tracker</h1>

                <p>Select a company to view previous question papers.</p>

                <div className="company-grid">

                    {companies.map((company) => (

                        <div
                            key={company}
                            className="company-card"
                            onClick={() => navigate(`/company/${company}`)}
                        >
                            {company}
                        </div>

                    ))}

                </div>

            </div>

        </Layout>

    );

}

export default CompanyPreparation;