import "./App.css";
import Appointments from "./pages/Appointments";
import MedicalRecords from "./pages/MedicalRecords";

function App() {
    return (
        <div style={{ padding: "20px" }}>
            <h1>Hospital Management</h1>

            <h2>Medical Records</h2>
            <MedicalRecords />

            <h2>Appointments</h2>
            <Appointments />
        </div>
    );
}

export default App;