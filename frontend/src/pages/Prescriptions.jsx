import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:5000/api/prescriptions";

function Prescriptions() {

    const navigate = useNavigate();

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

        try {

            const res = await axios.get(API);

            setPrescriptions(res.data);

        } catch (err) {

            console.log(err);
        }
    };

    const fetchRecords = async () => {

        try {

            const res = await axios.get(
                "http://localhost:5000/api/medical-records"
            );

            setRecords(res.data);

        } catch (err) {

            console.log(err);
        }
    };

    useEffect(() => {

        const loadData = async () => {

            await Promise.all([
                fetchPrescriptions(),
                fetchRecords(),
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

            fetchPrescriptions();

            setForm({
                medical_record_id: "",
                bari: "",
                dozimi: "",
                kohezgjatja: "",
                udhezime: "",
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

            fetchPrescriptions();

        } catch (err) {

            console.log(err);
        }
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

            <button
                onClick={() =>
                    navigate("/patients")
                }
            >
                Back
            </button>

            <h1>Prescriptions</h1>

            <form onSubmit={handleSubmit}>

                <select
                    name="medical_record_id"
                    value={form.medical_record_id}
                    onChange={handleChange}
                    required
                >

                    <option value="">
                        Select Medical Record
                    </option>

                    {records.map((r) => (

                        <option
                            key={r.id}
                            value={r.id}
                        >
                            {r.diagnoza}
                        </option>
                    ))}

                </select>

                <input
                    name="bari"
                    value={form.bari}
                    onChange={handleChange}
                    placeholder="Bari"
                    required
                />

                <input
                    name="dozimi"
                    value={form.dozimi}
                    onChange={handleChange}
                    placeholder="Dozimi"
                />

                <input
                    name="kohezgjatja"
                    value={form.kohezgjatja}
                    onChange={handleChange}
                    placeholder="Kohezgjatja"
                />

                <input
                    name="udhezime"
                    value={form.udhezime}
                    onChange={handleChange}
                    placeholder="Udhezime"
                />

                <button type="submit">

                    {editingId
                        ? "Update"
                        : "Add Prescription"}

                </button>

            </form>

            <table
                border="1"
                cellPadding="8"
                style={{
                    marginTop: "30px",
                    width: "100%",
                }}
            >

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Pacienti</th>
                        <th>Diagnoza</th>
                        <th>Bari</th>
                        <th>Dozimi</th>
                        <th>Kohezgjatja</th>
                        <th>Udhezime</th>
                        <th>Actions</th>
                    </tr>

                </thead>

                <tbody>

                    {prescriptions.map((p) => (

                        <tr key={p.id}>

                            <td>{p.id}</td>

                            <td>

                                {p.medicalrecords?.patients?.emri}{" "}

                                {p.medicalrecords?.patients?.mbiemri}

                            </td>

                            <td>
                                {p.medicalrecords?.diagnoza}
                            </td>

                            <td>{p.bari}</td>

                            <td>{p.dozimi}</td>

                            <td>{p.kohezgjatja}</td>

                            <td>{p.udhezime}</td>

                            <td>

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

export default Prescriptions;