import { Routes, Route } from "react-router-dom";
import Rooms from "./pages/Rooms";
import Payments from "./pages/Payments";
import Admissions from "./pages/Admissions";
import Invoices from "./pages/Invoices";
import Nurses from "./pages/Nurses";

function App() {
    return (
        <Routes>
             <Route path="/rooms" element={<Rooms />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/admissions" element={<Admissions />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/nurses" element={<Nurses />} />
        </Routes>
    );
}

export default App;