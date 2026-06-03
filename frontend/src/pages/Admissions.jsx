import { useState } from "react";

import {
    useNavigate
} from "react-router-dom";

export default function Admissions() {

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

    const [form, setForm] =
        useState({

            patient_id: "",
            room_id: "",
            admit_date: "",
            status: ""
        });

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            try {

                const res =
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

                if (!res.ok) {

                    throw new Error(
                        "Failed to add admission"
                    );
                }

                alert(
                    "Admission added successfully"
                );

                setForm({

                    patient_id: "",
                    room_id: "",
                    admit_date: "",
                    status: ""
                });

            } catch (err) {

                console.log(err);

                alert(
                    "Error adding admission"
                );
            }
        };

    return (

        <div className="page-card">

            <button
                onClick={handleBack}

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

                onSubmit={
                    handleSubmit
                }
            >

                <input
                    type="text"

                    placeholder=
                    "Patient ID"

                    value={
                        form.patient_id
                    }

                    onChange={(e) =>
                        setForm({
                            ...form,

                            patient_id:
                                e.target.value
                        })
                    }

                    required
                />

                <input
                    type="text"

                    placeholder=
                    "Room ID"

                    value={
                        form.room_id
                    }

                    onChange={(e) =>
                        setForm({
                            ...form,

                            room_id:
                                e.target.value
                        })
                    }

                    required
                />

                <input
                    type="date"

                    value={
                        form.admit_date
                    }

                    onChange={(e) =>
                        setForm({
                            ...form,

                            admit_date:
                                e.target.value
                        })
                    }

                    required
                />

                <input
                    type="text"

                    placeholder=
                    "Status"

                    value={
                        form.status
                    }

                    onChange={(e) =>
                        setForm({
                            ...form,

                            status:
                                e.target.value
                        })
                    }

                    required
                />

                <button type="submit">
                    Add Admission
                </button>

            </form>

        </div>
    );
}