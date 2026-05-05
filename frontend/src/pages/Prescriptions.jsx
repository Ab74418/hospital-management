import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/prescriptions";

function Prescriptions() {
    const [prescriptions, setPrescriptions] = useState([]);
    const [records, setRecords] = useState([]);
    const [editingId, setEditingId] = useState(null);

    const [form, setForm] = useState({
        medical_record_id: "",
        bari: "",
        dozimi: "",
        kohezgjatja: "",
        udhezime: "",
    });

    const fetchPrescriptions = async () => {
        const res = await axios.get(API);
        setPrescriptions(res.data);
    };

    const fetchRecords = async () => {
        const res = await axios.get("http://localhost:5000/api/medical-records");
        setRecords(res.data);
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                await Promise.all([
                    fetchPrescriptions(),
                    fetchRecords()
                ]);
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

        if (editingId) {
            await axios.put(`${API}/${editingId}`, form);
            setEditingId(null);
        } else {
            await axios.post(API, form);
        }

        fetchPrescriptions();

        setForm({
            medical_record_id: "",
            bari: "",
            dozimi: "",
            kohezgjatja: "",
            udhezime: "",
        });
    };

    const handleDelete = async (id) => {
        await axios.delete(`${API}/${id}`);
        fetchPrescriptions();
    };

    const handleEdit = (p) => {
        setForm({
            medical_record_id: p.medical_record_id,
            bari: p.bari,
            dozimi: p.dozimi,
            kohezgjatja: p.kohezgjatja,
            udhezime: p.udhezime,
        });

        setEditingId(p.id);
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Prescriptions</h2>

            <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
                <select
                    name="medical_record_id"
                    value={form.medical_record_id}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Medical Record</option>
                    {records.map((r) => (
                        <option key={r.id} value={r.id}>
                            Record {r.id} - {r.diagnoza}
                        </option>
                    ))}
                </select>

                <input name="bari" value={form.bari} onChange={handleChange} placeholder="Ilaçi" required />
                <input name="dozimi" value={form.dozimi} onChange={handleChange} placeholder="Dozimi" />
                <input name="kohezgjatja" value={form.kohezgjatja} onChange={handleChange} placeholder="Kohëzgjatja" />
                <input name="udhezime" value={form.udhezime} onChange={handleChange} placeholder="Udhëzime" />

                <button type="submit">
                    {editingId ? "Update" : "Add Prescription"}
                </button>
            </form>

            <table border="1" cellPadding="8">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Diagnoza</th>
                        <th>Bari</th>
                        <th>Dozimi</th>
                        <th>Kohëzgjatja</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {prescriptions.map((p) => (
                        <tr key={p.id}>
                            <td>{p.id}</td>

                            <td>{p.medicalrecords?.diagnoza}</td>

                            <td>{p.bari}</td>
                            <td>{p.dozimi}</td>
                            <td>{p.kohezgjatja}</td>

                            <td>
                                <button onClick={() => handleEdit(p)}>Edit</button>
                                <button onClick={() => handleDelete(p.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Prescriptions;