import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function PatientDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/patients/${id}/details`)
            .then((res) => {
                console.log(res.data);
                setData(res.data);
            })
            .catch((err) => console.log(err));
    }, [id]);

    return (
        <div style={{ padding: "20px" }}>

            <button
                onClick={() => navigate("/patients")}
                style={{
                    marginBottom: "15px",
                    padding: "8px 15px",
                    cursor: "pointer"
                }}
            >
                ⬅ Back
            </button>

            <h2>Patient Details</h2>

            {data.length === 0 ? (
                <p>No data found</p>
            ) : (
                data.map((item, index) => (
                    <div
                        key={index}
                        style={{
                            border: "1px solid #ccc",
                            marginBottom: "10px",
                            padding: "10px",
                        }}
                    >
                        <p><strong>Emri:</strong> {item.emri} {item.mbiemri}</p>
                        <p><strong>Diagnoza:</strong> {item.diagnoza || "N/A"}</p>
                        <p><strong>Trajtimi:</strong> {item.trajtimi || "N/A"}</p>
                        <p><strong>Bari:</strong> {item.bari || "N/A"}</p>
                    </div>
                ))
            )}
        </div>
    );
}

export default PatientDetails;