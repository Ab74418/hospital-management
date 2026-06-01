import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API =
    "http://localhost:5000/api/medical-records";

function MedicalRecords() {

    const navigate = useNavigate();

    const [records, setRecords] = useState([]);

    const [patients, setPatients] = useState([]);

    const [doctors, setDoctors] = useState([]);

    const [editingId, setEditingId] = useState(null);

    const [form, setForm] = useState({
        patient_id: "",
        doctor_id: "",
        diagnoza: "",
        trajtimi: "",
        prescriptions: "",
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

            const res = await axios.get(
                "http://localhost:5000/api/patients"
            );

            setPatients(res.data);

        } catch (err) {

            console.log(err);
        }
    };

    const fetchDoctors = async () => {

        try {

            const res = await axios.get(
                "http://localhost:5000/api/doctors"
            );

            setDoctors(res.data);

        } catch (err) {

            console.log(err);
        }
    };

    useEffect(() => {

        const loadData = async () => {

            await Promise.all([
                fetchRecords(),
                fetchPatients(),
                fetchDoctors(),
            ]);
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
                    `${API}/${editingId}`,
                    form
                );

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
                prescriptions: "",
                data: "",
            });

        } catch (err) {

            console.log(err);
        }
    };

    const handleDelete = async (id) => {

        try {

            await axios.delete(
                `${API}/${id}`
            );

            fetchRecords();

        } catch (err) {

            console.log(err);
        }
    };

    const handleEdit = (r) => {

        setForm({
            patient_id: r.patient_id,
            doctor_id: r.doctor_id,
            diagnoza: r.diagnoza,
            trajtimi: r.trajtimi,
            prescriptions: r.prescriptions,
            data: r.data?.split("T")[0],
        });

        setEditingId(r.id);
    };

    return (

        <div style={{ padding: "20px" }}>

            <button
                onClick={() =>
                    navigate("/patients")
                }
            >
                Back
            </button>

            <h1>Medical Records</h1>

            <form onSubmit={handleSubmit}>

                <select
                    name="patient_id"
                    value={form.patient_id}
                    onChange={handleChange}
                    required
                >

                    <option value="">
                        Select Patient
                    </option>

                    {patients.map((p) => (

                        <option
                            key={p.id}
                            value={p.id}
                        >
                            {p.emri} {p.mbiemri}
                        </option>

                    ))}

                </select>

                <select
                    name="doctor_id"
                    value={form.doctor_id}
                    onChange={handleChange}
                    required
                >

                    <option value="">
                        Select Doctor
                    </option>

                    {doctors.map((d) => (

                        <option
                            key={d.id}
                            value={d.id}
                        >
                            {d.emri} {d.mbiemri}
                        </option>

                    ))}

                </select>

                <input
                    type="text"
                    name="diagnoza"
                    placeholder="Diagnoza"
                    value={form.diagnoza}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="trajtimi"
                    placeholder="Trajtimi"
                    value={form.trajtimi}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="prescriptions"
                    placeholder="Barnat"
                    value={form.prescriptions}
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

                    {editingId
                        ? "Update"
                        : "Add"}

                </button>

            </form>

            <table
                border="1"
                cellPadding="10"
                cellSpacing="0"
                width="100%"
                style={{
                    marginTop: "30px",
                }}
            >

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Patient</th>
                        <th>Doctor</th>
                        <th>Diagnoza</th>
                        <th>Trajtimi</th>
                        <th>Barnat</th>
                        <th>Data</th>
                        <th>Actions</th>
                    </tr>

                </thead>

                <tbody>

                    {records.map((r) => (

                        <tr key={r.id}>

                            <td>{r.id}</td>

                            <td>
                                {r.patient_name}
                            </td>

                            <td>
                                {r.doctor_name}
                            </td>

                            <td>
                                {r.diagnoza}
                            </td>

                            <td>
                                {r.trajtimi}
                            </td>

                            <td>
                                {r.prescriptions}
                            </td>

                            <td>
                                {new Date(
                                    r.data
                                ).toLocaleDateString()}
                            </td>

                            <td>

                                <button
                                    onClick={() =>
                                        handleEdit(r)
                                    }
                                >
                                    Update
                                </button>

                                <button
                                    onClick={() =>
                                        handleDelete(r.id)
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

export default MedicalRecords;