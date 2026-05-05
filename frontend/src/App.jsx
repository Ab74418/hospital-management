import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Patients from "./pages/Patients";
import MedicalRecords from "./pages/MedicalRecords";
import Appointments from "./pages/Appointments";
import PatientDetails from "./pages/PatientDetails";

function App() {
    return (
        <Router>
            <div style={{ padding: "20px" }}>
                <h1>Hospital Management</h1>

                <Routes>
                    <Route path="/" element={<Patients />} />
                    <Route path="/patients" element={<Patients />} />
                    <Route path="/patients/:id" element={<PatientDetails />} />
                </Routes>

                <h2>Medical Records</h2>
                <MedicalRecords />

                <h2>Appointments</h2>
                <Appointments />
            </div>
        </Router>
    );
}

export default App;