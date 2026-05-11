import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Patients() {

    const [patients, setPatients] = useState([]);

    const [form, setForm] = useState({
        emri: "",
        mbiemri: "",
        data_lindjes: "",
        gjinia: "",
        telefoni: "",
        adresa: "",
        grupa_gjakut: "",
    });

    const [editingId, setEditingId] = useState(null);

    const navigate = useNavigate();

    const fetchPatients = async () => {

        try {

            const res = await axios.get(
                "http://localhost:5000/api/patients"
            );

            setPatients(res.data);

        } catch (err) {

            console.log(err);
        }
    };

    useEffect(() => {

        const loadData = async () => {

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

                await axios.put(
                    `http://localhost:5000/api/patients/${editingId}`,
                    form
                );

                setEditingId(null);

            } else {

                await axios.post(
                    "http://localhost:5000/api/patients",
                    form
                );
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

        } catch (err) {

            console.log(err);
        }
    };

    const handleDelete = async (id) => {

        try {

            await axios.delete(
                `http://localhost:5000/api/patients/${id}`
            );

            fetchPatients();

        } catch (err) {

            console.log(err);
        }
    };

    const handleEdit = (patient) => {

        setEditingId(patient.id);

        setForm({
            emri: patient.emri,
            mbiemri: patient.mbiemri,
            data_lindjes:
                patient.data_lindjes?.split("T")[0],
            gjinia: patient.gjinia,
            telefoni: patient.telefoni,
            adresa: patient.adresa,
            grupa_gjakut: patient.grupa_gjakut,
        });
    };

    const handleLogout = () => {

        localStorage.removeItem("token");

        navigate("/login");
    };

    return (

        <div style={{ padding: "20px" }}>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                }}
            >

                <h1>Patients</h1>

                <button onClick={handleLogout}>
                    Logout
                </button>

            </div>

            <form
                className="patient-form"
                onSubmit={handleSubmit}
            >

                <input
                    type="text"
                    name="emri"
                    placeholder="Emri"
                    value={form.emri}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="mbiemri"
                    placeholder="Mbiemri"
                    value={form.mbiemri}
                    onChange={handleChange}
                    required
                />

                <input
                    type="date"
                    name="data_lindjes"
                    value={form.data_lindjes}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="gjinia"
                    placeholder="Gjinia"
                    value={form.gjinia}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="telefoni"
                    placeholder="Telefoni"
                    value={form.telefoni}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="adresa"
                    placeholder="Adresa"
                    value={form.adresa}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="grupa_gjakut"
                    placeholder="Grupa e gjakut"
                    value={form.grupa_gjakut}
                    onChange={handleChange}
                    required
                />

                <button type="submit">

                    {editingId
                        ? "Update Patient"
                        : "Add Patient"}

                </button>

            </form>

            <table>

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Emri</th>
                        <th>Mbiemri</th>
                        <th>Actions</th>
                    </tr>

                </thead>

                <tbody>

                    {patients.map((p) => (

                        <tr key={p.id}>

                            <td>{p.id}</td>

                            <td>{p.emri}</td>

                            <td>{p.mbiemri}</td>

                            <td>

                                <button
                                    onClick={() =>
                                        navigate(
                                            `/patients/${p.id}`
                                        )
                                    }
                                >
                                    Details
                                </button>

                                <button
                                    onClick={() =>
                                        navigate(
                                            "/medical-records"
                                        )
                                    }
                                >
                                    Add Diagnosis
                                </button>
                                <button
                                    onClick={() =>
                                        navigate("/allergies")
                                    }
                                >
                                    Allergies
                                </button>
                                <button
                                    onClick={() =>
                                        navigate("/vitals")
                                    }
                                >
                                    Vitals
                                </button>
                                <button
                                    onClick={() =>
                                        navigate("/prescriptions")
                                    }
                                >
                                    Prescriptions
                                </button>

                                <button
                                    onClick={() =>
                                        handleEdit(p)
                                    }
                                >
                                    Update
                                </button>

                                <button
                                    onClick={() =>
                                        handleDelete(p.id)
                                    }
                                >
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

export default Patients;