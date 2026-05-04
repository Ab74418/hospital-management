import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/medical-records";

function MedicalRecords() {
    const [records, setRecords] = useState([]);
    const [form, setForm] = useState({
        patient_id: "",
        doctor_id: "",
        diagnoza: "",
        trajtimi: "",
        data: "",
    });

    const fetchRecords = async () => {
        const res = await axios.get(API);
        setRecords(res.data);
    };

    useEffect(() => {
        fetchRecords();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post(API, form);
        fetchRecords();
        setForm({
            patient_id: "",
            doctor_id: "",
            diagnoza: "",
            trajtimi: "",
            data: "",
        });
    };

    const handleDelete = async (id) => {
        await axios.delete(`${API}/${id}`);
        fetchRecords();
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Medical Records</h2>

            <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
                <input name="patient_id" value={form.patient_id} onChange={handleChange} placeholder="Patient ID" required />
                <input name="doctor_id" value={form.doctor_id} onChange={handleChange} placeholder="Doctor ID" required />
                <input name="diagnoza" value={form.diagnoza} onChange={handleChange} placeholder="Diagnoza" required />
                <input name="trajtimi" value={form.trajtimi} onChange={handleChange} placeholder="Trajtimi" required />
                <input type="date" name="data" value={form.data} onChange={handleChange} required />
                <button type="submit">Add</button>
            </form>

            <table border="1" cellPadding="8">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Patient</th>
                        <th>Doctor</th>
                        <th>Diagnoza</th>
                        <th>Trajtimi</th>
                        <th>Data</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {records.map((r) => (
                        <tr key={r.id}>
                            <td>{r.id}</td>
                            <td>{r.patient_id}</td>
                            <td>{r.doctor_id}</td>
                            <td>{r.diagnoza}</td>
                            <td>{r.trajtimi}</td>
                            <td>{new Date(r.data).toLocaleDateString()}</td>
                            <td>
                                <button onClick={() => handleDelete(r.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default MedicalRecords;