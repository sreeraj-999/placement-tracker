import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

function Aptitude() {
  const [quant, setQuant] = useState("");
  const [logical, setLogical] = useState("");
  const [verbal, setVerbal] = useState("");
  const [aptitudeData, setAptitudeData] = useState([]);

  useEffect(() => {
    fetchAptitude();
  }, []);

  const fetchAptitude = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/aptitude",
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      setAptitudeData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addAptitude = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/aptitude/add",
        {
          quant,
          logical,
          verbal,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      setQuant("");
      setLogical("");
      setVerbal("");

      fetchAptitude();

      alert("Aptitude Score Added Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container-fluid mt-4">
        <h1 className="mb-4">
          Aptitude Tracker
        </h1>

        <div className="card shadow p-4 mb-4">
          <h3>Add Aptitude Score</h3>

          <input
            className="form-control mb-3"
            type="number"
            placeholder="Quant Score"
            value={quant}
            onChange={(e) =>
              setQuant(e.target.value)
            }
          />

          <input
            className="form-control mb-3"
            type="number"
            placeholder="Logical Score"
            value={logical}
            onChange={(e) =>
              setLogical(e.target.value)
            }
          />

          <input
            className="form-control mb-3"
            type="number"
            placeholder="Verbal Score"
            value={verbal}
            onChange={(e) =>
              setVerbal(e.target.value)
            }
          />

          <button
            className="btn btn-primary"
            onClick={addAptitude}
          >
            Save Score
          </button>
        </div>

        <div className="card shadow p-4">
          <h3>Aptitude History</h3>

          {aptitudeData.length === 0 ? (
            <p>No aptitude scores added yet.</p>
          ) : (
            aptitudeData.map((item) => (
              <div
                key={item._id}
                className="border rounded p-3 mb-2"
              >
                <p>Quant: {item.quant}</p>
                <p>Logical: {item.logical}</p>
                <p>Verbal: {item.verbal}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Aptitude;