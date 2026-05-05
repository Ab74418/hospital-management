import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:5000/api/patients";

function Patients() {
    const [patients, setPatients] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        emri: "",
        mbiemri: "",
        data_lindjes: "",
        gjinia: "",
        telefoni: "",
        adresa: "",
        grupa_gjakut: "",
    });

    const fetchPatients = async () => {
        const res = await axios.get(API);
        setPatients(res.data);
    };
    useEffect(() => {
        const loadPatients = async () => {
            try {
                await fetchPatients();
            } catch (err) {
                console.log(err);
            }
        };

        loadPatients();
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

        fetchPatients();

        setForm({
            emri: "",
            mbiemri: "",
            data_lindjes: "",
            gjinia: "",
            telefoni: "",
            adresa: "",
            grupa_gjakut: "",
        });
    };

    const handleDelete = async (id) => {
        await axios.delete(`${API}/${id}`);
        fetchPatients();
    };

    const handleEdit = (p) => {
        setForm({
            emri: p.emri,
            mbiemri: p.mbiemri,
            data_lindjes: p.data_lindjes?.split("T")[0],
            gjinia: p.gjinia,
            telefoni: p.telefoni,
            adresa: p.adresa,
            grupa_gjakut: p.grupa_gjakut,
        });

        setEditingId(p.id);
    };

    const handleCancel = () => {
        setEditingId(null);
        setForm({
            emri: "",
            mbiemri: "",
            data_lindjes: "",
            gjinia: "",
            telefoni: "",
            adresa: "",
            grupa_gjakut: "",
        });
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Patients</h2>

            <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
                <input name="emri" value={form.emri} onChange={handleChange} placeholder="Emri" required />
                <input name="mbiemri" value={form.mbiemri} onChange={handleChange} placeholder="Mbiemri" required />
                <input type="date" name="data_lindjes" value={form.data_lindjes} onChange={handleChange} required />
                <input name="gjinia" value={form.gjinia} onChange={handleChange} placeholder="Gjinia" />
                <input name="telefoni" value={form.telefoni} onChange={handleChange} placeholder="Telefoni" />
                <input name="adresa" value={form.adresa} onChange={handleChange} placeholder="Adresa" />
                <input name="grupa_gjakut" value={form.grupa_gjakut} onChange={handleChange} placeholder="Grupi i gjakut" />

                <button type="submit">
                    {editingId ? "Update Patient" : "Add Patient"}
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
                        <th>Emri</th>
                        <th>Mbiemri</th>
                        <th>Data Lindjes</th>
                        <th>Gjinia</th>
                        <th>Telefoni</th>
                        <th>Adresa</th>
                        <th>Grupi</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {patients.length === 0 ? (
                        <tr>
                            <td colSpan="9">No patients</td>
                        </tr>
                    ) : (
                        patients.map((p) => (
                            <tr
                                key={p.id}
                                onClick={() => navigate(`/patients/${p.id}`)}
                                style={{ cursor: "pointer" }}
                            >
                                <td>{p.id}</td>
                                <td>{p.emri}</td>
                                <td>{p.mbiemri}</td>
                                <td>{new Date(p.data_lindjes).toLocaleDateString()}</td>
                                <td>{p.gjinia}</td>
                                <td>{p.telefoni}</td>
                                <td>{p.adresa}</td>
                                <td>{p.grupa_gjakut}</td>
                                <td>
                                    <button onClick={(e) => { e.stopPropagation(); handleEdit(p); }}>Edit</button>
                                    <button onClick={(e) => { e.stopPropagation(); handleDelete(p.id); }}>Delete</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Patients;