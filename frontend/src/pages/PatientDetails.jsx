import { useEffect, useState } from "react";
import axios from "axios";
import {
    useParams,
    useNavigate,
} from "react-router-dom";

function PatientDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState([]);

    useEffect(() => {
        const getDetails = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:5000/api/patients/${id}/details`
                );

                setData(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        getDetails();
    }, [id]);

    return (
        <div style={{ padding: "20px" }}>
            <button
                type="button"
                onClick={() =>
                    navigate("/patients")
                }
            >
                Back
            </button>

            <h1>Patient Details</h1>

            {data.length === 0 ? (
                <p>No data found</p>
            ) : (
                data.map((item, index) => (
                    <div
                        key={index}
                        style={{
                            backgroundColor: "white",
                            padding: "20px",
                            borderRadius: "10px",
                            marginBottom: "20px",
                            boxShadow:
                                "0 2px 10px rgba(0,0,0,0.1)",
                        }}
                    >
                        <p>
                            <strong>Emri:</strong>{" "}
                            {item.emri}{" "}
                            {item.mbiemri}
                        </p>

                        <p>
                            <strong>
                                Data Lindjes:
                            </strong>{" "}
                            {item.data_lindjes?.split(
                                "T"
                            )[0]}
                        </p>

                        <p>
                            <strong>Gjinia:</strong>{" "}
                            {item.gjinia}
                        </p>

                        <p>
                            <strong>
                                Telefoni:
                            </strong>{" "}
                            {item.telefoni}
                        </p>

                        <p>
                            <strong>Adresa:</strong>{" "}
                            {item.adresa}
                        </p>

                        <p>
                            <strong>
                                Grupi i gjakut:
                            </strong>{" "}
                            {item.grupa_gjakut}
                        </p>

                        <hr />

                        <p>
                            <strong>
                                Diagnoza:
                            </strong>{" "}
                            {item.diagnoza ||
                                "N/A"}
                        </p>

                        <p>
                            <strong>
                                Trajtimi:
                            </strong>{" "}
                            {item.trajtimi ||
                                "N/A"}
                        </p>

                        <p>
                            <strong>Bari:</strong>{" "}
                            {item.bari || "N/A"}
                        </p>

                        <p>
                            <strong>Dozimi:</strong>{" "}
                            {item.dozimi ||
                                "N/A"}
                        </p>

                        <p>
                            <strong>
                                Kohezgjatja:
                            </strong>{" "}
                            {item.kohezgjatja ||
                                "N/A"}
                        </p>

                        <p>
                            <strong>
                                Udhezime:
                            </strong>{" "}
                            {item.udhezime ||
                                "N/A"}
                        </p>
                    </div>
                ))
            )}
        </div>
    );
}

export default PatientDetails;