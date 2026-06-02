import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Nurses from "./pages/Nurses";
import RoomTypes from "./pages/RoomTypes";
import Departments from "./pages/Departments";
import Doctors from "./pages/Doctors";
import Payments from "./pages/Payments";
import Rooms from "./pages/Rooms";
import Specializations from "./pages/Specializations";
import Schedules from "./pages/Schedules";
import Patients from "./pages/Patients";
import Vitals from "./pages/Vitals";
import Appointments from "./pages/Appointments";
import Prescriptions from "./pages/Prescriptions";
import Allergies from "./pages/Allergies";
import MedicalRecords from "./pages/MedicalRecords";
import PatientVisits from "./pages/PatientVisits";
import DoctorSpecializations from "./pages/DoctorSpecializations";
import ProtectedRoute from "./components/ProtectedRoute";
import PatientDetails from "./pages/PatientDetails";
function App() {

    return (

        <Routes>

            <Route path="/" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route
                path="/home"
                element={
                    <ProtectedRoute>
                        <Home />
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
                path="/doctors"
                element={
                    <ProtectedRoute>
                        <Doctors />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/nurses"
                element={
                    <ProtectedRoute>
                        <Nurses />
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

            <Route
                path="/appointments"
                element={
                    <ProtectedRoute>
                        <Appointments />
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
                path="/roomtypes"
                element={
                    <ProtectedRoute>
                        <RoomTypes />
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
                path="/prescriptions"
                element={
                    <ProtectedRoute>
                        <Prescriptions />
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
                path="/medicalrecords"
                element={
                    <ProtectedRoute>
                        <MedicalRecords />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/patientvisits"
                element={
                    <ProtectedRoute>
                        <PatientVisits />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/schedules"
                element={
                    <ProtectedRoute>
                        <Schedules />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/specializations"
                element={
                    <ProtectedRoute>
                        <Specializations />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/doctorSpecializations"
                element={
                    <ProtectedRoute>
                        <DoctorSpecializations />
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

            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/" element={<Navigate to="/vitals" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/nurses" element={<Nurses />} />
            <Route path="/roomtypes" element={<RoomTypes />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/specializations" element={<Specializations />} />
            <Route path="/schedules" element={<Schedules />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/vitals" element={<Vitals />} />

        </Routes>
    );
}

export default App;