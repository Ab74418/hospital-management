import { useEffect, useState } from "react";
import axios from "axios";

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
        const res = await axios.get("http://localhost:5000/api/medical-records");
        setRecords(res.data);
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/medical-records");
                setRecords(res.data);
            } catch (err) {
                console.log(err);
            }
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

        await axios.post(
            "http://localhost:5000/api/medical-records",
            form
        );

        fetchRecords();

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

            <form onSubmit={handleSubmit}>
                <input
                    name="patient_id"
                    value={form.patient_id}
                    onChange={handleChange}
                    placeholder="Patient ID"
                />

                <input
                    name="doctor_id"
                    value={form.doctor_id}
                    onChange={handleChange}
                    placeholder="Doctor ID"
                />

                <input
                    name="diagnoza"
                    value={form.diagnoza}
                    onChange={handleChange}
                    placeholder="Diagnoza"
                />

                <input
                    name="trajtimi"
                    value={form.trajtimi}
                    onChange={handleChange}
                    placeholder="Trajtimi"
                />

                <input
                    type="date"
                    name="data"
                    value={form.data}
                    onChange={handleChange}
                />

                <button type="submit">Add</button>
            </form>

            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Patient</th>
                        <th>Doctor</th>
                        <th>Diagnoza</th>
                        <th>Trajtimi</th>
                        <th>Data</th>
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
                            <td>{r.data}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default MedicalRecords;