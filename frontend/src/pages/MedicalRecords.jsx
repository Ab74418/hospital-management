import { useEffect, useState } from "react";

import axios from "axios";

import {
    useNavigate
} from "react-router-dom";

const API =
    "http://localhost:5000/api/medical-records";

function MedicalRecords() {

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

    const [records,
        setRecords] =
        useState([]);

    const [patients,
        setPatients] =
        useState([]);

    const [doctors,
        setDoctors] =
        useState([]);

    const [editingId,
        setEditingId] =
        useState(null);

    const [form,
        setForm] =
        useState({

            patient_id: "",

            doctor_id: "",

            diagnoza: "",

            trajtimi: "",

            prescriptions: "",

            data: "",
        });

    const fetchRecords =
        async () => {

            try {

                const res =
                    await axios.get(
                        API
                    );

                setRecords(
                    res.data
                );

            } catch (err) {

                console.log(err);
            }
        };

    const fetchPatients =
        async () => {

            try {

                const res =
                    await axios.get(
                        "http://localhost:5000/api/patients"
                    );

                setPatients(
                    res.data
                );

            } catch (err) {

                console.log(err);
            }
        };

    const fetchDoctors =
        async () => {

            try {

                const res =
                    await axios.get(
                        "http://localhost:5000/api/doctors"
                    );

                setDoctors(
                    res.data
                );

            } catch (err) {

                console.log(err);
            }
        };

    useEffect(() => {

        const loadData =
            async () => {

                await Promise.all([
                    fetchRecords(),
                    fetchPatients(),
                    fetchDoctors(),
                ]);
            };

        loadData();

    }, []);

    const handleChange =
        (e) => {

            setForm({

                ...form,

                [e.target.name]:
                    e.target.value,
            });
        };

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            try {

                if (editingId) {

                    await axios.put(
                        `${API}/${editingId}`,
                        form
                    );

                    alert(
                        "Medical record updated!"
                    );

                    setEditingId(
                        null
                    );

                } else {

                    await axios.post(
                        API,
                        form
                    );

                    alert(
                        "Medical record added!"
                    );
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

                alert(
                    "Error saving medical record"
                );
            }
        };

    const handleDelete =
        async (id) => {

            const confirmDelete =
                window.confirm(
                    "A je e sigurt?"
                );

            if (!confirmDelete)
                return;

            try {

                await axios.delete(
                    `${API}/${id}`
                );

                alert(
                    "Medical record deleted!"
                );

                fetchRecords();

            } catch (err) {

                console.log(err);
            }
        };

    const handleEdit =
        (r) => {

            setForm({

                patient_id:
                    r.patient_id,

                doctor_id:
                    r.doctor_id,

                diagnoza:
                    r.diagnoza,

                trajtimi:
                    r.trajtimi,

                prescriptions:
                    r.prescriptions,

                data:
                    r.data?.split("T")[0],
            });

            setEditingId(
                r.id
            );
        };

    return (

        <div
            style={{

                padding:
                    "30px",

                background:
                    "#eef3f8",

                minHeight:
                    "100vh",
            }}
        >

            <div
                style={{

                    display:
                        "flex",

                    justifyContent:
                        "space-between",

                    marginBottom:
                        "30px",

                    flexWrap:
                        "wrap",

                    gap:
                        "15px",
                }}
            >

                <button
                    onClick={
                        handleBack
                    }

                    style={{

                        background:
                            "#1da1f2",

                        color:
                            "white",

                        border:
                            "none",

                        padding:
                            "16px 28px",

                        borderRadius:
                            "15px",

                        fontSize:
                            "18px",

                        fontWeight:
                            "bold",

                        cursor:
                            "pointer",
                    }}
                >
                    Back
                </button>

            </div>

            <h1
                style={{

                    textAlign:
                        "center",

                    color:
                        "#0d4d8b",

                    fontSize:
                        "70px",

                    marginBottom:
                        "40px",
                }}
            >
                Medical Records
            </h1>

            <form
                onSubmit={
                    handleSubmit
                }

                style={{

                    background:
                        "white",

                    padding:
                        "35px",

                    borderRadius:
                        "25px",

                    display:
                        "grid",

                    gridTemplateColumns:
                        "repeat(auto-fit, minmax(250px, 1fr))",

                    gap:
                        "20px",

                    marginBottom:
                        "40px",

                    boxShadow:
                        "0 4px 15px rgba(0,0,0,0.08)",
                }}
            >

                <select
                    name="patient_id"

                    value={
                        form.patient_id
                    }

                    onChange={
                        handleChange
                    }

                    required

                    style={{

                        padding:
                            "18px",

                        borderRadius:
                            "15px",

                        border:
                            "1px solid #cbd5e1",

                        fontSize:
                            "18px",
                    }}
                >

                    <option value="">
                        Select Patient
                    </option>

                    {patients.map((p) => (

                        <option
                            key={p.id}

                            value={p.id}
                        >
                            {p.emri}
                            {" "}
                            {p.mbiemri}
                        </option>

                    ))}

                </select>

                <select
                    name="doctor_id"

                    value={
                        form.doctor_id
                    }

                    onChange={
                        handleChange
                    }

                    required

                    style={{

                        padding:
                            "18px",

                        borderRadius:
                            "15px",

                        border:
                            "1px solid #cbd5e1",

                        fontSize:
                            "18px",
                    }}
                >

                    <option value="">
                        Select Doctor
                    </option>

                    {doctors.map((d) => (

                        <option
                            key={d.id}

                            value={d.id}
                        >
                            {d.emri}
                            {" "}
                            {d.mbiemri}
                        </option>

                    ))}

                </select>

                <input
                    type="text"

                    name="diagnoza"

                    placeholder=
                    "Diagnoza"

                    value={
                        form.diagnoza
                    }

                    onChange={
                        handleChange
                    }

                    required

                    style={{

                        padding:
                            "18px",

                        borderRadius:
                            "15px",

                        border:
                            "1px solid #cbd5e1",

                        fontSize:
                            "18px",
                    }}
                />

                <input
                    type="text"

                    name="trajtimi"

                    placeholder=
                    "Trajtimi"

                    value={
                        form.trajtimi
                    }

                    onChange={
                        handleChange
                    }

                    required

                    style={{

                        padding:
                            "18px",

                        borderRadius:
                            "15px",

                        border:
                            "1px solid #cbd5e1",

                        fontSize:
                            "18px",
                    }}
                />

                <input
                    type="text"

                    name="prescriptions"

                    placeholder=
                    "Barnat"

                    value={
                        form.prescriptions
                    }

                    onChange={
                        handleChange
                    }

                    required

                    style={{

                        padding:
                            "18px",

                        borderRadius:
                            "15px",

                        border:
                            "1px solid #cbd5e1",

                        fontSize:
                            "18px",
                    }}
                />

                <input
                    type="date"

                    name="data"

                    value={
                        form.data
                    }

                    onChange={
                        handleChange
                    }

                    required

                    style={{

                        padding:
                            "18px",

                        borderRadius:
                            "15px",

                        border:
                            "1px solid #cbd5e1",

                        fontSize:
                            "18px",
                    }}
                />

                <button
                    type="submit"

                    style={{

                        background:
                            "#1da1f2",

                        color:
                            "white",

                        border:
                            "none",

                        padding:
                            "15px 25px",

                        borderRadius:
                            "12px",

                        fontWeight:
                            "bold",

                        fontSize:
                            "18px",

                        cursor:
                            "pointer",
                    }}
                >

                    {editingId
                        ? "Update"
                        : "Add"}

                </button>

            </form>

            <div
                style={{

                    overflowX:
                        "auto",

                    background:
                        "white",

                    borderRadius:
                        "25px",

                    boxShadow:
                        "0 4px 15px rgba(0,0,0,0.08)",
                }}
            >

                <table
                    style={{

                        width:
                            "100%",

                        borderCollapse:
                            "collapse",

                        minWidth:
                            "1200px",
                    }}
                >

                    <thead>

                        <tr
                            style={{

                                background:
                                    "#1da1f2",

                                color:
                                    "white",
                            }}
                        >

                            <th style={{ padding: "20px" }}>
                                ID
                            </th>

                            <th style={{ padding: "20px" }}>
                                Patient
                            </th>

                            <th style={{ padding: "20px" }}>
                                Doctor
                            </th>

                            <th style={{ padding: "20px" }}>
                                Diagnoza
                            </th>

                            <th style={{ padding: "20px" }}>
                                Trajtimi
                            </th>

                            <th style={{ padding: "20px" }}>
                                Barnat
                            </th>

                            <th style={{ padding: "20px" }}>
                                Data
                            </th>

                            <th style={{ padding: "20px" }}>
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {records.map((r) => (

                            <tr
                                key={r.id}

                                style={{

                                    textAlign:
                                        "center",

                                    borderBottom:
                                        "1px solid #e2e8f0",
                                }}
                            >

                                <td style={{ padding: "25px" }}>
                                    {r.id}
                                </td>

                                <td style={{ padding: "25px" }}>
                                    {r.patient_name}
                                </td>

                                <td style={{ padding: "25px" }}>
                                    {r.doctor_name}
                                </td>

                                <td style={{ padding: "25px" }}>
                                    {r.diagnoza}
                                </td>

                                <td style={{ padding: "25px" }}>
                                    {r.trajtimi}
                                </td>

                                <td style={{ padding: "25px" }}>
                                    {r.prescriptions}
                                </td>

                                <td style={{ padding: "25px" }}>
                                    {new Date(
                                        r.data
                                    ).toLocaleDateString()}
                                </td>

                                <td
                                    style={{
                                        padding:
                                            "20px",
                                    }}
                                >

                                    <div
                                        style={{

                                            display:
                                                "flex",

                                            gap:
                                                "10px",

                                            justifyContent:
                                                "center",

                                            flexWrap:
                                                "wrap",
                                        }}
                                    >

                                        <button
                                            onClick={() =>
                                                handleEdit(
                                                    r
                                                )
                                            }

                                            style={{

                                                background:
                                                    "#1da1f2",

                                                color:
                                                    "white",

                                                border:
                                                    "none",

                                                padding:
                                                    "12px 22px",

                                                borderRadius:
                                                    "12px",

                                                fontWeight:
                                                    "bold",

                                                cursor:
                                                    "pointer",
                                            }}
                                        >
                                            Update
                                        </button>

                                        <button
                                            onClick={() =>
                                                handleDelete(
                                                    r.id
                                                )
                                            }

                                            style={{

                                                background:
                                                    "crimson",

                                                color:
                                                    "white",

                                                border:
                                                    "none",

                                                padding:
                                                    "12px 22px",

                                                borderRadius:
                                                    "12px",

                                                fontWeight:
                                                    "bold",

                                                cursor:
                                                    "pointer",
                                            }}
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </td>

                            </tr>
                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default MedicalRecords;