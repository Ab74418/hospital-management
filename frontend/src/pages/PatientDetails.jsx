import { useEffect, useState } from "react"; import axios from "axios";

import { useParams, useNavigate, } from "react-router-dom";

function PatientDetails() {

    // Merr ID prej URL
    const { id } = useParams();

    // Per navigim
    const navigate = useNavigate();

    // State per patient details
    const [data, setData] = useState([]);

    // Loading state
    const [loading, setLoading] = useState(true);

    // Error state
    const [error, setError] = useState("");



    // Merr te dhenat e pacientit
    useEffect(() => {

        const getDetails = async () => {

            try {

                const res = await axios.get(
                    `http://localhost:5000/api/patients/${id}/details`
                );

                setData(res.data);

            } catch (err) {

                console.log(err);

                setError("Failed to load patient details");

            } finally {

                setLoading(false);
            }
        };

        getDetails();

    }, [id]);



    // Loading message
    if (loading) {
        return (
            <div style={{ padding: "20px" }}>
                <h2>Loading...</h2>
            </div>
        );
    }



    // Error message
    if (error) {
        return (
            <div style={{ padding: "20px" }}>
                <h2>{error}</h2>
            </div>
        );
    }



    return (

        <div
            style={{
                padding: "20px",
                minHeight: "100vh",
                backgroundColor: "#f5f5f5",
            }}
        >

            {/* Back button */}
            <button
                type="button"
                onClick={() => navigate("/patients")}
                style={{
                    marginBottom: "20px",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    backgroundColor: "#2563eb",
                    color: "white",
                    fontWeight: "bold",
                }}
            >
                Back
            </button>



            <h1
                style={{
                    marginBottom: "30px",
                }}
            >
                Patient Details
            </h1>



            {data.length === 0 ? (

                <p>No data found</p>

            ) : (

                data.map((item, index) => (

                    <div
                        key={index}
                        style={{
                            backgroundColor: "white",
                            padding: "25px",
                            borderRadius: "15px",
                            marginBottom: "25px",
                            boxShadow:
                                "0 4px 15px rgba(0,0,0,0.1)",
                        }}
                    >

                        {/* Patient Info */}
                        <h2
                            style={{
                                marginBottom: "20px",
                                color: "#2563eb",
                            }}
                        >
                            Patient Information
                        </h2>

                        <p>
                            <strong>Emri:</strong>{" "}
                            {item.emri} {item.mbiemri}
                        </p>

                        <p>
                            <strong>Data Lindjes:</strong>{" "}
                            {item.data_lindjes?.split("T")[0]}
                        </p>

                        <p>
                            <strong>Gjinia:</strong>{" "}
                            {item.gjinia}
                        </p>

                        <p>
                            <strong>Telefoni:</strong>{" "}
                            {item.telefoni}
                        </p>

                        <p>
                            <strong>Adresa:</strong>{" "}
                            {item.adresa}
                        </p>

                        <p>
                            <strong>Grupi i gjakut:</strong>{" "}
                            {item.grupa_gjakut}
                        </p>



                        <hr
                            style={{
                                margin: "25px 0",
                            }}
                        />



                        {/* Medical Record */}
                        <h2
                            style={{
                                marginBottom: "20px",
                                color: "#dc2626",
                            }}
                        >
                            Medical Record
                        </h2>

                        <p>
                            <strong>Diagnoza:</strong>{" "}
                            {item.diagnoza || "N/A"}
                        </p>

                        <p>
                            <strong>Trajtimi:</strong>{" "}
                            {item.trajtimi || "N/A"}
                        </p>



                        <hr
                            style={{
                                margin: "25px 0",
                            }}
                        />



                        {/* Prescription */}
                        <h2
                            style={{
                                marginBottom: "20px",
                                color: "#16a34a",
                            }}
                        >
                            Prescription
                        </h2>

                        <p>
                            <strong>Bari:</strong>{" "}
                            {item.bari || "N/A"}
                        </p>

                        <p>
                            <strong>Dozimi:</strong>{" "}
                            {item.dozimi || "N/A"}
                        </p>

                        <p>
                            <strong>Kohezgjatja:</strong>{" "}
                            {item.kohezgjatja || "N/A"}
                        </p>

                        <p>
                            <strong>Udhezime:</strong>{" "}
                            {item.udhezime || "N/A"}
                        </p>

                    </div>
                ))
            )}
        </div>
    );

}

export default PatientDetails;