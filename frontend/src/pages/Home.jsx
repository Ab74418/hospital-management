import { Link } from "react-router-dom";
import "../App.css";

function Home() {

    return (

        <div className="dashboard">

            <div className="sidebar">

                <h2>Hospital Admin</h2>

                <Link to="/home">Dashboard</Link>

                <Link to="/patients">Patients</Link>

                <Link to="/doctors">Doctors</Link>

                <Link to="/nurses">Nurses</Link>

                <Link to="/departments">Departments</Link>

                <Link to="/appointments">Appointments</Link>

                <Link to="/rooms">Rooms</Link>

                <Link to="/roomtypes">Room Types</Link>

                <Link to="/payments">Payments</Link>

                <Link to="/billing">Billing</Link>

                <Link to="/prescriptions">Prescriptions</Link>

                <Link to="/allergies">Allergies</Link>

                <Link to="/medicalrecords">Medical Records</Link>

                <Link to="/patientvisits">Patient Visits</Link>

                <Link to="/schedules">Schedules</Link>

                <Link to="/specializations">Specializations</Link>

                <Link to="/doctorSpecializations">
                    Doctor Specializations
                </Link>

                <Link to="/vitals">Vitals</Link>

                <button
                    className="logout-btn"
                    onClick={() => {
                        localStorage.clear();
                        window.location.href = "/";
                    }}
                >
                    Logout
                </button>

            </div>

            <div className="main-content">

                <h1>Hospital Dashboard</h1>

                <div className="cards">

                    <div className="card">
                        <h2>Doctors</h2>
                        <p>Manage all doctors</p>
                    </div>

                    <div className="card">
                        <h2>Patients</h2>
                        <p>Manage all patients</p>
                    </div>

                    <div className="card">
                        <h2>Nurses</h2>
                        <p>Manage all nurses</p>
                    </div>

                    <div className="card">
                        <h2>Departments</h2>
                        <p>Hospital departments</p>
                    </div>

                    <div className="card">
                        <h2>Appointments</h2>
                        <p>Manage appointments</p>
                    </div>

                    <div className="card">
                        <h2>Payments</h2>
                        <p>Hospital payments</p>
                    </div>

                    <div className="card">
                        <h2>Rooms</h2>
                        <p>Manage hospital rooms</p>
                    </div>

                    <div className="card">
                        <h2>Medical Records</h2>
                        <p>Patient medical history</p>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default Home;