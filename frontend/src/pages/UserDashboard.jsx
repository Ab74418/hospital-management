import { useEffect, useState } from "react";

import {
    useNavigate
} from "react-router-dom";

function UserDashboard() {

    const navigate =
        useNavigate();

    const [appointments,
        setAppointments] =
        useState([]);

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

    const handleLogout =
        () => {

            localStorage.removeItem(
                "token"
            );

            localStorage.removeItem(
                "role"
            );

            navigate("/login");
        };

    const userId = 1;

    useEffect(() => {

        fetch(
            `http://localhost:5000/api/appointments/my/${userId}`
        )
            .then((res) =>
                res.json()
            )

            .then((data) =>
                setAppointments(data)
            )

            .catch((err) =>
                console.log(err)
            );

    }, []);

    const nextAppointment =
        appointments[0];

    return (

        <div className="page-card">

            <button
                onClick={
                    handleBack
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
                User Dashboard
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

            <div
                style={{

                    display:
                        "flex",

                    gap:
                        "15px",

                    marginTop:
                        "20px",

                    flexWrap:
                        "wrap",
                }}
            >

                <button
                    onClick={() =>
                        navigate("/myappointments")
                    }
                >
                    My Appointments
                </button>

                <button
                    onClick={() =>
                        navigate("/patients")
                    }
                >
                    Patients
                </button>

                <button
                    onClick={() =>
                        navigate("/medicalrecords")
                    }
                >
                    Medical Records
                </button>

                <button
                    onClick={() =>
                        navigate("/prescriptions")
                    }
                >
                    Prescriptions
                </button>

                <button
                    onClick={
                        handleLogout
                    }

                    style={{
                        background:
                            "crimson",

                        color:
                            "white",
                    }}
                >
                    Logout
                </button>

            </div>

        </div>
    );
}

export default UserDashboard;