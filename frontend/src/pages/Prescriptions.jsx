import { useEffect, useState } from "react";

import axios from "axios";

import {
    useNavigate
} from "react-router-dom";

const API =
    "http://localhost:5000/api/prescriptions";

function Prescriptions() {

    const navigate =
        useNavigate();

    const role =
        localStorage.getItem("role");

    const handleBack = () => {

        switch (role) {

            case "admin":
                navigate("/home");
                break;

            case "doctor":
                navigate("/doctor");
                break;

            case "receptionist":
                navigate("/receptionist");
                break;

            case "user":
                navigate("/user");
                break;

            default:
                navigate("/");
        }
    };

    const [prescriptions,
        setPrescriptions] =
        useState([]);

    const [records,
        setRecords] =
        useState([]);

    const [editingId,
        setEditingId] =
        useState(null);

    const [form,
        setForm] =
        useState({

            medical_record_id: "",

            bari: "",

            dozimi: "",

            kohezgjatja: "",

            udhezime: "",
        });

    const fetchPrescriptions =
        async () => {

            try {

                const res =
                    await axios.get(API);

                setPrescriptions(
                    res.data
                );

            } catch (err) {

                console.log(err);
            }
        };

    const fetchRecords =
        async () => {

            try {

                const res =
                    await axios.get(
                        "http://localhost:5000/api/medical-records"
                    );

                setRecords(
                    res.data
                );

            } catch (err) {

                console.log(err);
            }
        };

    useEffect(() => {

        fetchPrescriptions();

        fetchRecords();

    }, []);

    const handleChange =
        (e) => {

            setForm({

                ...form,

                [e.target.name]:
                    e.target.value,
            });
        };

    const resetForm =
        () => {

            setForm({

                medical_record_id: "",

                bari: "",

                dozimi: "",

                kohezgjatja: "",

                udhezime: "",
            });

            setEditingId(null);
        };

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            try {

                const data = {

                    medical_record_id:
                        Number(
                            form.medical_record_id
                        ),

                    bari:
                        form.bari,

                    dozimi:
                        form.dozimi,

                    kohezgjatja:
                        form.kohezgjatja,

                    udhezime:
                        form.udhezime,
                };

                if (editingId) {

                    await axios.put(

                        `${API}/${editingId}`,

                        data
                    );

                    alert(
                        "Prescription updated!"
                    );

                } else {

                    await axios.post(
                        API,
                        data
                    );

                    alert(
                        "Prescription added!"
                    );
                }

                fetchPrescriptions();

                resetForm();

            } catch (err) {

                console.log(
                    err.response?.data ||
                    err.message
                );

                alert(
                    "Error saving prescription"
                );
            }
        };

    const handleDelete =
        async (id) => {

            const confirmDelete =
                window.confirm(
                    "A don me fshi prescription?"
                );

            if (!confirmDelete)
                return;

            try {

                await axios.delete(
                    `${API}/${id}`
                );

                alert(
                    "Prescription deleted!"
                );

                fetchPrescriptions();

            } catch (err) {

                console.log(err);
            }
        };

    const handleEdit =
        (p) => {

            setForm({

                medical_record_id:
                    p.medical_record_id,

                bari:
                    p.bari || "",

                dozimi:
                    p.dozimi || "",

                kohezgjatja:
                    p.kohezgjatja || "",

                udhezime:
                    p.udhezime || "",
            });

            setEditingId(
                p.id
            );
        };

    return (

        <div className="page-container">

            <div className="page-card">

                <button
                    className="back-btn"

                    onClick={
                        handleBack
                    }
                >
                    Back
                </button>

                <h1>
                    Prescriptions
                </h1>

                <form
                    className="patient-form"

                    onSubmit={
                        handleSubmit
                    }
                >

                    <select
                        name="medical_record_id"

                        value={
                            form.medical_record_id
                        }

                        onChange={
                            handleChange
                        }

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

                                {r.patients

                                    ?

                                    `${r.patients.emri} ${r.patients.mbiemri}`

                                    :

                                    "Pa pacient"}

                                {" - Diagnoza: "}

                                {r.diagnoza}

                            </option>

                        ))}

                    </select>

                    <input
                        type="text"

                        name="bari"

                        value={
                            form.bari
                        }

                        onChange={
                            handleChange
                        }

                        placeholder="Bari"

                        required
                    />

                    <input
                        type="text"

                        name="dozimi"

                        value={
                            form.dozimi
                        }

                        onChange={
                            handleChange
                        }

                        placeholder="Dozimi"
                    />

                    <input
                        type="text"

                        name="kohezgjatja"

                        value={
                            form.kohezgjatja
                        }

                        onChange={
                            handleChange
                        }

                        placeholder="Kohezgjatja"
                    />

                    <input
                        type="text"

                        name="udhezime"

                        value={
                            form.udhezime
                        }

                        onChange={
                            handleChange
                        }

                        placeholder="Udhezime"
                    />

                    <button type="submit">

                        {editingId

                            ?

                            "Update Prescription"

                            :

                            "Add Prescription"}

                    </button>

                </form>

                <div
                    className="page-card"

                    style={{
                        marginTop:
                            "30px",
                    }}
                >

                    <table>

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

                            {prescriptions.map(
                                (p) => (

                                    <tr
                                        key={p.id}
                                    >

                                        <td>
                                            {p.id}
                                        </td>

                                        <td>

                                            {p.medicalrecords?.patients

                                                ?

                                                `${p.medicalrecords.patients.emri} ${p.medicalrecords.patients.mbiemri}`

                                                :

                                                "Pa pacient"}

                                        </td>

                                        <td>

                                            {
                                                p.medicalrecords?.diagnoza
                                            }

                                        </td>

                                        <td>
                                            {p.bari}
                                        </td>

                                        <td>
                                            {p.dozimi}
                                        </td>

                                        <td>
                                            {p.kohezgjatja}
                                        </td>

                                        <td>
                                            {p.udhezime}
                                        </td>

                                        <td>

                                            <button
                                                onClick={() =>
                                                    handleEdit(p)
                                                }
                                            >
                                                Edit
                                            </button>

                                            <button

                                                onClick={() =>
                                                    handleDelete(
                                                        p.id
                                                    )
                                                }

                                                style={{
                                                    marginLeft:
                                                        "10px",

                                                    background:
                                                        "crimson",
                                                }}
                                            >
                                                Delete
                                            </button>

                                        </td>

                                    </tr>
                                )
                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}

export default Prescriptions;