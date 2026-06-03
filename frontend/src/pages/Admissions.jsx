import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Admissions() {

    const navigate = useNavigate();

    const [form, setForm] = useState({

        patient_id: "",
        room_id: "",
        admit_date: "",
        status: ""
    });

    const handleSubmit = async (e) => {

        e.preventDefault();

        await fetch(
            "http://localhost:5000/api/admissions",
            {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json",
                },

                body:
                    JSON.stringify(form),
            }
        );

        alert("Admission added");

        setForm({

            patient_id: "",
            room_id: "",
            admit_date: "",
            status: ""
        });
    };

    return (

        <div className="page-card">

            <button
                onClick={() =>
                    navigate("/receptionist")
                }

                style={{

                    background:
                        "#1ea5e7",

                    color:
                        "white",

                    border:
                        "none",

                    padding:
                        "14px 24px",

                    borderRadius:
                        "14px",

                    fontSize:
                        "18px",

                    fontWeight:
                        "bold",

                    cursor:
                        "pointer",

                    marginBottom:
                        "20px",
                }}
            >
                Back
            </button>

            <h1>
                Admissions
            </h1>

            <form
                className="patient-form"
                onSubmit={handleSubmit}
            >

                <input
                    type="text"
                    placeholder="Patient ID"

                    value={form.patient_id}

                    onChange={(e) =>
                        setForm({
                            ...form,
                            patient_id:
                                e.target.value
                        })
                    }
                />

                <input
                    type="text"
                    placeholder="Room ID"

                    value={form.room_id}

                    onChange={(e) =>
                        setForm({
                            ...form,
                            room_id:
                                e.target.value
                        })
                    }
                />

                <input
                    type="date"

                    value={form.admit_date}

                    onChange={(e) =>
                        setForm({
                            ...form,
                            admit_date:
                                e.target.value
                        })
                    }
                />

                <input
                    type="text"
                    placeholder="Status"

                    value={form.status}

                    onChange={(e) =>
                        setForm({
                            ...form,
                            status:
                                e.target.value
                        })
                    }
                />

                <button type="submit">
                    Add Admission
                </button>

            </form>

        </div>
    );
}