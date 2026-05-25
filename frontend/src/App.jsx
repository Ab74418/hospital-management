import "./App.css";

import {
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import Patients from "./pages/Patients";
import PatientDetails from "./pages/PatientDetails";
import MedicalRecords from "./pages/MedicalRecords";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Allergies from "./pages/Allergies";
import Prescriptions from "./pages/Prescriptions";
import Vitals from "./pages/Vitals";
import Rooms from "./pages/Rooms";
import Payments from "./pages/Payments";
import Doctors from "./pages/Doctors";
import Appointments from "./pages/Appointments";
import Departments from "./pages/Departments";

function App() {
    return (
        <div>
            <Routes>

                <Route path="/" element={<Navigate to="/login" />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route
                    path="/patients"
                    element={
                        <ProtectedRoute>
                            <Patients />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/patients/:id"
                    element={
                        <ProtectedRoute>
                            <PatientDetails />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/medical-records"
                    element={
                        <ProtectedRoute>
                            <MedicalRecords />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/allergies"
                    element={
                        <ProtectedRoute>
                            <Allergies />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/prescriptions"
                    element={
                        <ProtectedRoute>
                            <Prescriptions />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/vitals"
                    element={
                        <ProtectedRoute>
                            <Vitals />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/rooms"
                    element={
                        <ProtectedRoute>
                            <Rooms />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/payments"
                    element={
                        <ProtectedRoute>
                            <Payments />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/doctors"
                    element={
                        <ProtectedRoute>
                            <Doctors />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/appointments"
                    element={
                        <ProtectedRoute>
                            <Appointments />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/departments"
                    element={
                        <ProtectedRoute>
                            <Departments />
                        </ProtectedRoute>
                    }
                />

            </Routes>
        </div>
    );
}

export default App;