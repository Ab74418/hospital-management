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
import RoomTypes from "./pages/RoomTypes";
import Nurses from "./pages/Nurses";
import Schedules from "./pages/Schedules";
import Specializations from "./pages/Specializations";
import DoctorSpecializations from "./pages/DoctorSpecializations";

function App() {

    return (

        <div>

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
                    path="/roomtypes"
                    element={
                        <ProtectedRoute allowedRole="admin">
                            <RoomTypes />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/nurses"
                    element={
                        <ProtectedRoute allowedRole="admin">
                            <Nurses />
                        </ProtectedRoute>
                    }
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
                        <ProtectedRoute allowedRole="doctor">
                            <MedicalRecords />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/allergies"
                    element={
                        <ProtectedRoute allowedRole="doctor">
                            <Allergies />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/prescriptions"
                    element={
                        <ProtectedRoute allowedRole="doctor">
                            <Prescriptions />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/vitals"
                    element={
                        <ProtectedRoute allowedRole="doctor">
                            <Vitals />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/rooms"
                    element={
                        <ProtectedRoute allowedRole="admin">
                            <Rooms />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/payments"
                    element={
                        <ProtectedRoute allowedRole="admin">
                            <Payments />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/doctors"
                    element={
                        <ProtectedRoute allowedRole="admin">
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
                        <ProtectedRoute allowedRole="admin">
                            <Departments />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/schedules"
                    element={
                        <ProtectedRoute allowedRole="doctor">
                            <Schedules />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/specializations"
                    element={
                        <ProtectedRoute allowedRole="admin">
                            <Specializations />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/doctor-specializations"
                    element={
                        <ProtectedRoute allowedRole="admin">
                            <DoctorSpecializations />
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </div>
    );
}

export default App;