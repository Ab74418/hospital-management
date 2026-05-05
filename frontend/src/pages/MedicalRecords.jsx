import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/medical-records";

function MedicalRecords() {
    const [records, setRecords] = useState([]);
    const [patients, setPatients] = useState([]);
    const [editingId, setEditingId] = useState(null);

    const [form, setForm] = useState({
        patient_id: "",
        doctor_id: "",
        diagnoza: "",
        trajtimi: "",
        data: "",
    });

    const fetchRecords = async () => {
        try {
            const res = await axios.get(API);
            setRecords(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchPatients = async () => {
        try {
            const res = await axios.get("http://localhost:5000/patients");
            setPatients(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            await fetchRecords();
            await fetchPatients();
        };

        loadData();
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editingId) {
                await axios.put(`${API}/${editingId}`, form);
                setEditingId(null);
            } else {
                await axios.post(API, form);
            }

            fetchRecords();

            setForm({
                patient_id: "",
                doctor_id: "",
                diagnoza: "",
                trajtimi: "",
                data: "",
            });

        } catch (err) {
            console.log(err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API}/${id}`);
            fetchRecords();
        } catch (err) {
            console.log(err);
        }
    };

    const handleEdit = (record) => {
        setForm({
            patient_id: record.patient_id,
            doctor_id: record.doctor_id,
            diagnoza: record.diagnoza,
            trajtimi: record.trajtimi,
            data: record.data?.split("T")[0],
        });

        setEditingId(record.id);
    };

    const handleCancel = () => {
        setEditingId(null);
        setForm({
            patient_id: "",
            doctor_id: "",
            diagnoza: "",
            trajtimi: "",
            data: "",
        });
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Medical Records</h2>

            <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>

                <select
                    name="patient_id"
                    value={form.patient_id}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Patient</option>
                    {patients.map((p) => (
                        <option key={p.id} value={p.id}>
                            {p.emri} {p.mbiemri}
                        </option>
                    ))}
                </select>

                <input
                    name="doctor_id"
                    value={form.doctor_id}
                    onChange={handleChange}
                    placeholder="Doctor ID"
                    required
                />

                <input
                    name="diagnoza"
                    value={form.diagnoza}
                    onChange={handleChange}
                    placeholder="Diagnoza"
                    required
                />

                <input
                    name="trajtimi"
                    value={form.trajtimi}
                    onChange={handleChange}
                    placeholder="Trajtimi"
                    required
                />

                <input
                    type="date"
                    name="data"
                    value={form.data}
                    onChange={handleChange}
                    required
                />

                <button type="submit">
                    {editingId ? "Update" : "Add"}
                </button>

                {editingId && (
                    <button type="button" onClick={handleCancel}>
                        Cancel
                    </button>
                )}
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
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {records.length === 0 ? (
                        <tr>
                            <td colSpan="7">No records found</td>
                        </tr>
                    ) : (
                        records.map((r) => (
                            <tr key={r.id}>
                                <td>{r.id}</td>

                                <td>
                                    {patients.find(p => p.id === r.patient_id)?.emri}{" "}
                                    {patients.find(p => p.id === r.patient_id)?.mbiemri}
                                </td>

                                <td>{r.doctor_id}</td>
                                <td>{r.diagnoza}</td>
                                <td>{r.trajtimi}</td>
                                <td>{new Date(r.data).toLocaleDateString()}</td>

                                <td>
                                    <button onClick={() => handleEdit(r)}>Edit</button>
                                    <button onClick={() => handleDelete(r.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default MedicalRecords;

