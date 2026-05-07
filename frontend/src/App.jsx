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

function App() {

    return (

        <Routes>

            <Route
                path="/"
                element={<Navigate to="/login" />}
            />

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

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

        </Routes>

    );
}

export default App;