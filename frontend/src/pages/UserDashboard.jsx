import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UserDashboard() {

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

    const nextAppointment =
        appointments[0];

    return (

        <div className="page-card">

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
                    display: "flex",
                    gap: "15px",
                    marginTop: "20px",
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
                        navigate("/login")
                    }

                    style={{
                        background: "crimson",
                    }}
                >
                    Logout
                </button>

            </div>

        </div>
    );
}

export default UserDashboard;