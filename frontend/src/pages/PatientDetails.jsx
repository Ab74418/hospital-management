import { useEffect, useState } from "react";

import axios from "axios";

import {
    useParams,
    useNavigate,
} from "react-router-dom";

function PatientDetails() {

    const { id } =
        useParams();

    const navigate =
        useNavigate();

    const role =
        localStorage.getItem("role");

    const handleBack = () => {

        switch (role) {

            case "admin":
                navigate("/home");
                break;

            case "doctor":
                navigate("/doctor");
                break;

            case "receptionist":
                navigate("/receptionist");
                break;

            case "user":
                navigate("/user");
                break;

            default:
                navigate("/");
        }
    };

    const [data,
        setData] =
        useState(null);

    const [loading,
        setLoading] =
        useState(true);

    const [error,
        setError] =
        useState("");

    useEffect(() => {

        const getDetails =
            async () => {

                try {

                    const res =
                        await axios.get(
                            `http://localhost:5000/api/patients/${id}/details`
                        );

                    setData(
                        res.data
                    );

                } catch (err) {

                    console.log(err);

                    setError(
                        "Failed to load patient details"
                    );

                } finally {

                    setLoading(
                        false
                    );
                }
            };

        getDetails();

    }, [id]);

    if (loading) {

        return (

            <div
                style={{
                    padding:
                        "20px",
                }}
            >
                <h2>
                    Loading...
                </h2>
            </div>
        );
    }

    if (error) {

        return (

            <div
                style={{
                    padding:
                        "20px",
                }}
            >
                <h2>
                    {error}
                </h2>
            </div>
        );
    }

    return (

        <div
            style={{

                padding:
                    "20px",

                minHeight:
                    "100vh",

                backgroundColor:
                    "#f5f5f5",
            }}
        >

            <button
                type="button"

                onClick={
                    handleBack
                }

                style={{

                    marginBottom:
                        "20px",

                    padding:
                        "10px 20px",

                    border:
                        "none",

                    borderRadius:
                        "8px",

                    cursor:
                        "pointer",

                    backgroundColor:
                        "#2563eb",

                    color:
                        "white",

                    fontWeight:
                        "bold",
                }}
            >
                Back
            </button>

            <h1
                style={{
                    marginBottom:
                        "30px",
                }}
            >
                Patient Details
            </h1>

            {!data ? (

                <p>
                    No data found
                </p>

            ) : (

                <div
                    style={{

                        backgroundColor:
                            "white",

                        padding:
                            "25px",

                        borderRadius:
                            "15px",

                        marginBottom:
                            "25px",

                        boxShadow:
                            "0 4px 15px rgba(0,0,0,0.1)",
                    }}
                >

                    <h2
                        style={{

                            marginBottom:
                                "20px",

                            color:
                                "#2563eb",
                        }}
                    >
                        Patient Information
                    </h2>

                    <p>
                        <strong>
                            Emri:
                        </strong>

                        {" "}

                        {data.emri}
                        {" "}
                        {data.mbiemri}
                    </p>

                    <p>
                        <strong>
                            Data Lindjes:
                        </strong>

                        {" "}

                        {
                            data.data_lindjes?.split("T")[0]
                        }
                    </p>

                    <p>
                        <strong>
                            Gjinia:
                        </strong>

                        {" "}

                        {
                            data.gjinia
                        }
                    </p>

                    <p>
                        <strong>
                            Telefoni:
                        </strong>

                        {" "}

                        {
                            data.telefoni
                        }
                    </p>

                    <p>
                        <strong>
                            Adresa:
                        </strong>

                        {" "}

                        {
                            data.adresa
                        }
                    </p>

                    <p>
                        <strong>
                            Grupi i gjakut:
                        </strong>

                        {" "}

                        {
                            data.grupa_gjakut
                        }
                    </p>

                    <hr
                        style={{
                            margin:
                                "25px 0",
                        }}
                    />

                    <h2
                        style={{

                            marginBottom:
                                "20px",

                            color:
                                "#dc2626",
                        }}
                    >
                        Medical Record
                    </h2>

                    <p>
                        <strong>
                            Diagnoza:
                        </strong>

                        {" "}

                        {
                            data.diagnoza
                            || "N/A"
                        }
                    </p>

                    <p>
                        <strong>
                            Trajtimi:
                        </strong>

                        {" "}

                        {
                            data.trajtimi
                            || "N/A"
                        }
                    </p>

                    <hr
                        style={{
                            margin:
                                "25px 0",
                        }}
                    />

                    <h2
                        style={{

                            marginBottom:
                                "20px",

                            color:
                                "#16a34a",
                        }}
                    >
                        Prescription
                    </h2>

                    <p>
                        <strong>
                            Bari:
                        </strong>

                        {" "}

                        {
                            data.bari
                            || "N/A"
                        }
                    </p>

                    <p>
                        <strong>
                            Dozimi:
                        </strong>

                        {" "}

                        {
                            data.dozimi
                            || "N/A"
                        }
                    </p>

                    <p>
                        <strong>
                            Kohezgjatja:
                        </strong>

                        {" "}

                        {
                            data.kohezgjatja
                            || "N/A"
                        }
                    </p>

                    <p>
                        <strong>
                            Udhezime:
                        </strong>

                        {" "}

                        {
                            data.udhezime
                            || "N/A"
                        }
                    </p>

                </div>
            )}

        </div>
    );
}

export default PatientDetails;