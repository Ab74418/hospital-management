import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function DoctorDashboard() {

    const navigate = useNavigate();

    const [appointments, setAppointments] =
        useState([]);

    const doctorId = 1;

    useEffect(() => {

        fetch(
            `http://localhost:5000/api/appointments/doctor/${doctorId}`
        )
            .then((res) => res.json())
            .then((data) => setAppointments(data))
            .catch((err) => console.log(err));

    }, []);

    const nextAppointment =
        appointments[0];

    return (

        <div className="page-card">

            <h1>
                Doctor Dashboard
            </h1>

            <div className="cards">

                <div className="card">

                    <h2>
                        Total Appointments
                    </h2>

                    <p>
                        {appointments.length}
                    </p>

                </div>

                <div className="card">

                    <h2>
                        Upcoming Appointment
                    </h2>

                    <p>

                        {
                            nextAppointment?.data?.slice(0, 10)
                            || "No appointment"
                        }

                    </p>

                </div>

            </div>

            <button
                onClick={() =>
                    navigate("/doctorappointments")
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

                    marginTop:
                        "20px",
                }}
            >
                My Appointments
            </button>

        </div>
    );
}

export default DoctorDashboard;