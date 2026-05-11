import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Allergies() {

    const navigate = useNavigate();

    const [allergies, setAllergies] = useState([]);

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

    useEffect(() => {

        const getData = async () => {

            await fetchAllergies();
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

        <div style={{ padding: "20px" }}>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                }}
            >

                <button
                    onClick={() =>
                        navigate("/patients")
                    }
                >
                    Back
                </button>

                <button
                    onClick={() => {

                        localStorage.removeItem("token");

                        navigate("/login");
                    }}
                >
                    Logout
                </button>

            </div>

            <h1>Allergies</h1>

            <form
                className="patient-form"
                onSubmit={handleSubmit}
            >

                <input
                    type="number"
                    placeholder="Patient ID"
                    value={formData.patient_id}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            patient_id: e.target.value,
                        })
                    }
                    required
                />

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
                />

                <button type="submit">

                    {editingId
                        ? "Update Allergy"
                        : "Add Allergy"}

                </button>

            </form>

            <table>

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Patient ID</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>

                </thead>

                <tbody>

                    {allergies.map((allergy) => (

                        <tr key={allergy.id}>

                            <td>{allergy.id}</td>

                            <td>
                                {allergy.patient_id}
                            </td>

                            <td>
                                {allergy.pershkrimi}
                            </td>

                            <td>

                                <button
                                    onClick={() =>
                                        handleEdit(allergy)
                                    }
                                >
                                    Update
                                </button>

                                <button
                                    onClick={() =>
                                        handleDelete(allergy.id)
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

export default Allergies;