import { useEffect, useState } from "react";
import axios from "axios";

function Allergies() {
    const [allergies, setAllergies] = useState([]);

    const [formData, setFormData] = useState({
        patient_id: "",
        pershkrimi: "",
    });

    const [editingId, setEditingId] = useState(null);

    const fetchAllergies = async () => {
        try {
            const res = await axios.get(
                "http://localhost:5000/allergies"
            );

            setAllergies(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:5000/allergies"
                );

                setAllergies(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        getData();
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editingId) {
                await axios.put(
                    `http://localhost:5000/allergies/${editingId}`,
                    formData
                );

                setEditingId(null);
            } else {
                await axios.post(
                    "http://localhost:5000/allergies",
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
                `http://localhost:5000/allergies/${id}`
            );

            fetchAllergies();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h1>Allergies</h1>

            <form onSubmit={handleSubmit}>
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
                />

                <button type="submit">
                    {editingId ? "Update" : "Add"}
                </button>
            </form>

            <hr />

            {allergies.map((allergy) => (
                <div key={allergy.id}>
                    <p>
                        Patient ID: {allergy.patient_id}
                    </p>

                    <p>
                        Description: {allergy.pershkrimi}
                    </p>

                    <button
                        onClick={() => handleEdit(allergy)}
                    >
                        Edit
                    </button>

                    <button
                        onClick={() =>
                            handleDelete(allergy.id)
                        }
                    >
                        Delete
                    </button>

                    <hr />
                </div>
            ))}
        </div>
    );
}

export default Allergies;