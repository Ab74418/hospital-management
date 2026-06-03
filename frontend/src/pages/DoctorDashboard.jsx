import { Link, useNavigate } from "react-router-dom";

function DoctorDashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div className="doctor-page">
            <div className="doctor-header">
                <h1>Doctor Dashboard</h1>

                <button onClick={handleLogout} className="logout-doctor-btn">
                    Log Out
                </button>
            </div>

            <div className="doctor-grid">
                <Link to="/doctorappointments" className="doctor-card">
                    <h2>My Appointments</h2>
                    <p>View your scheduled appointments</p>
                </Link>

                <Link to="/patients" className="doctor-card">
                    <h2>Patients</h2>
                    <p>View patient information</p>
                </Link>

                <Link to="/patientvisits" className="doctor-card">
                    <h2>Patient Visits</h2>
                    <p>Add diagnosis and treatment</p>
                </Link>

                <Link to="/prescriptions" className="doctor-card">
                    <h2>Prescriptions</h2>
                    <p>Add patient medications</p>
                </Link>

                <Link to="/medicalrecords" className="doctor-card">
                    <h2>Medical Records</h2>
                    <p>View patient medical history</p>
                </Link>

                <Link to="/schedules" className="doctor-card">
                    <h2>Schedules</h2>
                    <p>View your working schedule</p>
                </Link>
            </div>
        </div>
    );
}

export default DoctorDashboard;