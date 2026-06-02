import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Allergies() {

    const navigate = useNavigate();

    const [allergies, setAllergies] = useState([]);

    const [patients, setPatients] = useState([]);

    const [formData, setFormData] = useState({
        patient_id: "",
        pershkrimi: "",
    });

    const [editingId, setEditingId] = useState(null);

    const fetchAllergies = async () => {

        try {

            const res = await axios.get(
                "http://localhost:5000/api/allergies"
            );

            setAllergies(res.data);

        } catch (error) {

            console.log(error);
        }
    };

    const fetchPatients = async () => {

        try {

            const res = await axios.get(
                "http://localhost:5000/api/patients"
            );

            setPatients(res.data);

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {

        const getData = async () => {

            await Promise.all([
                fetchAllergies(),
                fetchPatients(),
            ]);
        };

        getData();

    }, []);

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (editingId) {

                await axios.put(
                    `http://localhost:5000/api/allergies/${editingId}`,
                    formData
                );

                setEditingId(null);

            } else {

                await axios.post(
                    "http://localhost:5000/api/allergies",
                    formData
                );
            }

            setFormData({
                patient_id: "",
                pershkrimi: "",
            });

            fetchAllergies();

        } catch (error) {

            console.log(error);
        }
    };

    const handleEdit = (allergy) => {

        setFormData({
            patient_id: allergy.patient_id,
            pershkrimi: allergy.pershkrimi,
        });

        setEditingId(allergy.id);
    };

    const handleDelete = async (id) => {

        try {

            await axios.delete(
                `http://localhost:5000/api/allergies/${id}`
            );

            fetchAllergies();

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <div
            style={{
                padding: "30px",
                background: "#eef3f8",
                minHeight: "100vh",
            }}
        >

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "30px",
                }}
            >

                <button
                    onClick={() =>
                        navigate("/home")
                    }
                    style={{
                        background: "#1da1f2",
                        color: "white",
                        border: "none",
                        padding: "16px 28px",
                        borderRadius: "15px",
                        fontSize: "18px",
                        fontWeight: "bold",
                        cursor: "pointer",
                    }}
                >
                    Back
                </button>

                <button
                    onClick={() => {

                        localStorage.removeItem("token");

                        navigate("/login");
                    }}
                    style={{
                        background: "#1da1f2",
                        color: "white",
                        border: "none",
                        padding: "16px 28px",
                        borderRadius: "15px",
                        fontSize: "18px",
                        fontWeight: "bold",
                        cursor: "pointer",
                    }}
                >
                    Logout
                </button>

            </div>

            <h1
                style={{
                    textAlign: "center",
                    color: "#0d4d8b",
                    fontSize: "70px",
                    marginBottom: "40px",
                }}
            >
                Allergies
            </h1>

            <form
                onSubmit={handleSubmit}
                style={{
                    background: "white",
                    padding: "35px",
                    borderRadius: "25px",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: "20px",
                    marginBottom: "40px",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
                }}
            >

                <select
                    value={formData.patient_id}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            patient_id: e.target.value,
                        })
                    }
                    required
                    style={{
                        padding: "18px",
                        borderRadius: "15px",
                        border: "1px solid #cbd5e1",
                        fontSize: "18px",
                    }}
                >

                    <option value="">
                        Select Patient
                    </option>

                    {patients.map((patient) => (

                        <option
                            key={patient.id}
                            value={patient.id}
                        >
                            {patient.emri}{" "}
                            {patient.mbiemri}
                        </option>

                    ))}

                </select>

                <input
                    type="text"
                    placeholder="Description"
                    value={formData.pershkrimi}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            pershkrimi: e.target.value,
                        })
                    }
                    required
                    style={{
                        padding: "18px",
                        borderRadius: "15px",
                        border: "1px solid #cbd5e1",
                        fontSize: "18px",
                    }}
                />

                <button
                    type="submit"
                    style={{
                        background: "#1da1f2",
                        color: "white",
                        border: "none",
                        borderRadius: "15px",
                        fontSize: "22px",
                        fontWeight: "bold",
                        cursor: "pointer",
                    }}
                >

                    {editingId
                        ? "Update Allergy"
                        : "Add Allergy"}

                </button>

            </form>

            <div
                style={{
                    background: "white",
                    borderRadius: "25px",
                    overflow: "hidden",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
                }}
            >

                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                    }}
                >

                    <thead>

                        <tr
                            style={{
                                background: "#1da1f2",
                                color: "white",
                            }}
                        >
                            <th
                                style={{
                                    padding: "20px",
                                    fontSize: "24px",
                                }}
                            >
                                ID
                            </th>

                            <th
                                style={{
                                    padding: "20px",
                                    fontSize: "24px",
                                }}
                            >
                                Patient
                            </th>

                            <th
                                style={{
                                    padding: "20px",
                                    fontSize: "24px",
                                }}
                            >
                                Description
                            </th>

                            <th
                                style={{
                                    padding: "20px",
                                    fontSize: "24px",
                                }}
                            >
                                Actions
                            </th>
                        </tr>

                    </thead>

                    <tbody>

                        {allergies.map((allergy) => (

                            <tr
                                key={allergy.id}
                                style={{
                                    textAlign: "center",
                                    borderBottom:
                                        "1px solid #e2e8f0",
                                }}
                            >

                                <td
                                    style={{
                                        padding: "25px",
                                        fontSize: "22px",
                                    }}
                                >
                                    {allergy.id}
                                </td>

                                <td
                                    style={{
                                        padding: "25px",
                                        fontSize: "22px",
                                    }}
                                >
                                    {allergy.patient_name}
                                </td>

                                <td
                                    style={{
                                        padding: "25px",
                                        fontSize: "22px",
                                    }}
                                >
                                    {allergy.pershkrimi}
                                </td>

                                <td
                                    style={{
                                        padding: "25px",
                                        display: "flex",
                                        justifyContent: "center",
                                        gap: "15px",
                                    }}
                                >

                                    <button
                                        onClick={() =>
                                            handleEdit(allergy)
                                        }
                                        style={{
                                            background: "#1da1f2",
                                            color: "white",
                                            border: "none",
                                            padding:
                                                "14px 22px",
                                            borderRadius:
                                                "12px",
                                            fontWeight:
                                                "bold",
                                            cursor: "pointer",
                                            fontSize: "18px",
                                        }}
                                    >
                                        Update
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleDelete(
                                                allergy.id
                                            )
                                        }
                                        style={{
                                            background:
                                                "crimson",
                                            color: "white",
                                            border: "none",
                                            padding:
                                                "14px 22px",
                                            borderRadius:
                                                "12px",
                                            fontWeight:
                                                "bold",
                                            cursor: "pointer",
                                            fontSize: "18px",
                                        }}
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default Allergies;