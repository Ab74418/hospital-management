import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MyAppointments() {

    const navigate = useNavigate();

    const [appointments, setAppointments] =
        useState([]);

    const userId = 1;

    useEffect(() => {

        fetch(
            `http://localhost:5000/api/appointments/my/${userId}`
        )
            .then((res) => res.json())
            .then((data) => setAppointments(data))
            .catch((err) => console.log(err));

    }, []);

    return (

        <div className="page-card">

            <button
                onClick={() =>
                    navigate("/userdashboard")
                }

                style={{

                    background:
                        "#1ea5e7",

                    color:
                        "white",

                    border:
                        "none",

                    padding:
                        "14px 24px",

                    borderRadius:
                        "14px",

                    fontSize:
                        "18px",

                    fontWeight:
                        "bold",

                    cursor:
                        "pointer",

                    marginBottom:
                        "20px",
                }}
            >
                Back
            </button>

            <h1>
                My Appointments
            </h1>

            <div className="cards">

                {appointments.map((app) => (

                    <div
                        className="card"
                        key={app.id}
                    >

                        <h2>

                            {
                                app.doctors?.emri
                            }

                            {" "}

                            {
                                app.doctors?.mbiemri
                            }

                        </h2>

                        <p>

                            <strong>
                                Data:
                            </strong>

                            {" "}

                            {
                                app.data?.slice(0, 10)
                            }

                        </p>

                        <p>

                            <strong>
                                Ora:
                            </strong>

                            {" "}

                            {
                                app.ora?.slice(11, 16)
                            }

                        </p>

                        <p>

                            <strong>
                                Statusi:
                            </strong>

                            {" "}

                            {
                                app.statusi
                            }

                        </p>

                        <p>

                            <strong>
                                Shënime:
                            </strong>

                            {" "}

                            {
                                app.shenime
                            }

                        </p>

                    </div>
                ))}

            </div>

        </div>
    );
}