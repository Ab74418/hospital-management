import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Nurses from "./pages/Nurses";
import RoomTypes from "./pages/RoomTypes";
import Departments from "./pages/Departments";
import Doctors from "./pages/Doctors";
import Payments from "./pages/Payments";
import Rooms from "./pages/Rooms";
import Specializations from "./pages/Specializations";
import Schedules from "./pages/Schedules";
import Patients from "./pages/Patients";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
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
        </Routes>
    );
}

export default App;