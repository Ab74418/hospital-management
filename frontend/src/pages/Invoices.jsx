import { useState } from "react";

import {
    useNavigate
} from "react-router-dom";

export default function Invoices() {

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

    const [form,
        setForm] =
        useState({

            admission_id: "",

            amount: "",

            status: ""
        });

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            try {

                const res =
                    await fetch(
                        "http://localhost:5000/api/invoices",
                        {

                            method:
                                "POST",

                            headers: {
                                "Content-Type":
                                    "application/json",
                            },

                            body:
                                JSON.stringify(
                                    form
                                ),
                        }
                    );

                if (!res.ok) {

                    throw new Error(
                        "Failed to add invoice"
                    );
                }

                alert(
                    "Invoice added successfully"
                );

                setForm({

                    admission_id: "",

                    amount: "",

                    status: ""
                });

            } catch (err) {

                console.log(err);

                alert(
                    "Error adding invoice"
                );
            }
        };

    return (

        <div className="page-card">

            <button
                onClick={
                    handleBack
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
                Invoices
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
                    "Admission ID"

                    value={
                        form.admission_id
                    }

                    onChange={(e) =>
                        setForm({
                            ...form,

                            admission_id:
                                e.target.value
                        })
                    }

                    required
                />

                <input
                    type="text"

                    placeholder=
                    "Amount"

                    value={
                        form.amount
                    }

                    onChange={(e) =>
                        setForm({
                            ...form,

                            amount:
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
                    Add Invoice
                </button>

            </form>

        </div>
    );
}