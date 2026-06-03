import { Link } from "react-router-dom";

function ReceptionistDashboard() {
    return (
        <div className="receptionist-page">
            <h1>Receptionist Dashboard</h1>

            <div className="receptionist-stats">
                <div className="receptionist-stat-card">
                    <h3>Patients</h3>
                    <p>120</p>
                </div>

                <div className="receptionist-stat-card">
                    <h3>Appointments</h3>
                    <p>35</p>
                </div>

                <div className="receptionist-stat-card">
                    <h3>Free Rooms</h3>
                    <p>18</p>
                </div>
            </div>

            <div className="receptionist-grid">
                <Link to="/patients" className="receptionist-card">
                    <h2>Patients</h2>
                    <p>Manage all patients</p>
                </Link>

                <Link to="/appointments" className="receptionist-card">
                    <h2>Appointments</h2>
                    <p>Manage appointments</p>
                </Link>

                <Link to="/admissions" className="receptionist-card">
                    <h2>Admissions</h2>
                    <p>Manage patient admissions</p>
                </Link>

                <Link to="/rooms" className="receptionist-card">
                    <h2>Rooms</h2>
                    <p>Check room availability</p>
                </Link>

                <Link to="/invoices" className="receptionist-card">
                    <h2>Invoices</h2>
                    <p>Manage invoices</p>
                </Link>

                <Link to="/payments" className="receptionist-card">
                    <h2>Payments</h2>
                    <p>Manage payments</p>
                </Link>
            </div>
        </div>
    );
}

export default ReceptionistDashboard;