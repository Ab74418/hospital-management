import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Invoices() {

    const navigate = useNavigate();

    const [form, setForm] = useState({

        admission_id: "",
        amount: "",
        status: ""
    });

    const handleSubmit = async (e) => {

        e.preventDefault();

        await fetch(
            "http://localhost:5000/api/invoices",
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

        alert("Invoice added");

        setForm({

            admission_id: "",
            amount: "",
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
                Invoices
            </h1>

            <form
                className="patient-form"
                onSubmit={handleSubmit}
            >

                <input
                    type="text"
                    placeholder="Admission ID"

                    value={form.admission_id}

                    onChange={(e) =>
                        setForm({
                            ...form,
                            admission_id:
                                e.target.value
                        })
                    }
                />

                <input
                    type="text"
                    placeholder="Amount"

                    value={form.amount}

                    onChange={(e) =>
                        setForm({
                            ...form,
                            amount:
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
                    Add Invoice
                </button>

            </form>

        </div>
    );
}