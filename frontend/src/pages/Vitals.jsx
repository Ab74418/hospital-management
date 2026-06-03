import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:5000/api/vitals";

function Vitals() {
    const navigate = useNavigate();

    const [vitals, setVitals] = useState([]);
    const [editingId, setEditingId] = useState(null);

    const [form, setForm] = useState({
        patient_id: "",
        nurse_id: "",
        temperatura: "",
        tensioni: "",
        data: "",
    });

    const fetchVitals = async () => {
        const res = await axios.get(API);
        setVitals(res.data);
    };

    useEffect(() => {
        fetchVitals();
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editingId) {
            await axios.put(`${API}/${editingId}`, form);
            setEditingId(null);
        } else {
            await axios.post(API, form);
        }

        await fetchVitals();

        setForm({
            patient_id: "",
            nurse_id: "",
            temperatura: "",
            tensioni: "",
            data: "",
        });
    };

    const handleDelete = async (id) => {
        await axios.delete(`${API}/${id}`);
        fetchVitals();
    };

    const handleEdit = (v) => {
        setForm({
            patient_id: v.patient_id || "",
            nurse_id: v.nurse_id || "",
            temperatura: v.temperatura || "",
            tensioni: v.tensioni || "",
            data: v.data?.split("T")[0] || "",
        });

        setEditingId(v.id);
    };

    return (
        <div style={{ padding: "20px" }}>
            <button onClick={() => navigate("/home")}>
                Back
            </button>

            <h1>Vitals</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    name="patient_id"
                    placeholder="Patient ID"
                    value={form.patient_id}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="nurse_id"
                    placeholder="Nurse ID"
                    value={form.nurse_id}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    step="0.1"
                    name="temperatura"
                    placeholder="Temperatura"
                    value={form.temperatura}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="tensioni"
                    placeholder="Tensioni"
                    value={form.tensioni}
                    onChange={handleChange}
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
                    {editingId ? "Update" : "Add Vital"}
                </button>
            </form>

            <table
                border="1"
                cellPadding="10"
                style={{
                    marginTop: "30px",
                    width: "100%",
                }}
            >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Patient</th>
                        <th>Nurse</th>
                        <th>Temperatura</th>
                        <th>Tensioni</th>
                        <th>Data</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {vitals.map((v) => (
                        <tr key={v.id}>
                            <td>{v.id}</td>

                            <td>
                                {v.patient_emri || "No Patient"}{" "}
                                {v.patient_mbiemri || ""}
                            </td>

                            <td>
                                {v.nurse_emri || "No Nurse"}{" "}
                                {v.nurse_mbiemri || ""}
                            </td>

                            <td>{v.temperatura} °C</td>

                            <td>{v.tensioni}</td>

                            <td>
                                {v.data
                                    ? new Date(v.data).toLocaleDateString()
                                    : ""}
                            </td>

                            <td>
                                <button onClick={() => handleEdit(v)}>
                                    Update
                                </button>

                                <button onClick={() => handleDelete(v.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Vitals;