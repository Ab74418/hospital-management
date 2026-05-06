import "./App.css";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import Patients from "./pages/Patients";
import PatientDetails from "./pages/PatientDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <Router>
            <div style={{ padding: "20px" }}>
                <h1>Hospital Management</h1>

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

                </Routes>
            </div>
        </Router>
    );
}

export default App;