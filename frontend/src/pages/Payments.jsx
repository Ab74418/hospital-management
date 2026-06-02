import { useEffect, useState } from "react";

import {
    useNavigate
} from "react-router-dom";

export default function Payments() {

    const navigate =
        useNavigate();

    const [payments,
        setPayments] =
        useState([]);

    const [editingId,
        setEditingId] =
        useState(null);

    const [formData,
        setFormData] =
        useState({

            invoice_id: "",

            amount: "",

            payment_method: "",

            statusi: ""
        });

    const fetchPayments =
        async () => {

            try {

                const res =
                    await fetch(
                        "http://localhost:5000/api/payments"
                    );

                const data =
                    await res.json();

                setPayments(data);

            } catch (error) {

                console.error(error);
            }
        };

    useEffect(() => {

        fetchPayments();

    }, []);

    const handleChange =
        (e) => {

            setFormData({

                ...formData,

                [e.target.name]:
                    e.target.value
            });
        };

    const resetForm =
        () => {

            setFormData({

                invoice_id: "",

                amount: "",

                payment_method: "",

                statusi: ""
            });

            setEditingId(null);
        };

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            const url =

                editingId

                    ?

                    `http://localhost:5000/api/payments/${editingId}`

                    :

                    "http://localhost:5000/api/payments";

            const method =

                editingId
                    ? "PUT"
                    : "POST";

            try {

                const res =
                    await fetch(url, {

                        method,

                        headers: {

                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(
                                formData
                            )
                    });

                if (res.ok) {

                    alert(

                        editingId

                            ?

                            "Payment u përditësua"

                            :

                            "Payment u shtua"
                    );

                    resetForm();

                    fetchPayments();
                }

            } catch (error) {

                console.error(error);
            }
        };

    const handleEdit =
        (payment) => {

            setEditingId(payment.id);

            setFormData({

                invoice_id:
                    payment.invoice_id,

                amount:
                    payment.amount,

                payment_method:
                    payment.payment_method,

                statusi:
                    payment.statusi
            });
        };

    const handleDelete =
        async (id) => {

            const confirmDelete =
                window.confirm(
                    "A je e sigurt që don me fshi këtë payment?"
                );

            if (!confirmDelete)
                return;

            try {

                const res =
                    await fetch(
                        `http://localhost:5000/api/payments/${id}`,
                        {
                            method:
                                "DELETE"
                        }
                    );

                if (res.ok) {

                    alert(
                        "Payment u fshi me sukses"
                    );

                    fetchPayments();
                }

            } catch (error) {

                console.error(error);
            }
        };

    return (

        <div className="page-card">

            <button
                onClick={() =>
                    navigate("/home")
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

                    boxShadow:
                        "0 2px 10px rgba(0,0,0,0.1)",
                }}
            >
                Back
            </button>

            <h1>
                Payments
            </h1>

            <form
                className="patient-form"

                onSubmit={
                    handleSubmit
                }
            >

                <input
                    type="number"
                    name="invoice_id"
                    placeholder="Invoice ID"
                    value={
                        formData.invoice_id
                    }
                    onChange={
                        handleChange
                    }
                    required
                />

                <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={
                        formData.amount
                    }
                    onChange={
                        handleChange
                    }
                    required
                />

                <input
                    type="text"
                    name="payment_method"
                    placeholder="Payment Method"
                    value={
                        formData.payment_method
                    }
                    onChange={
                        handleChange
                    }
                    required
                />

                <input
                    type="text"
                    name="statusi"
                    placeholder="Statusi"
                    value={
                        formData.statusi
                    }
                    onChange={
                        handleChange
                    }
                    required
                />

                <button
                    type="submit"
                >

                    {editingId

                        ?

                        "Update Payment"

                        :

                        "Add Payment"}

                </button>

                {editingId && (

                    <button
                        type="button"

                        onClick={
                            resetForm
                        }

                        style={{
                            background:
                                "gray",
                        }}
                    >
                        Cancel
                    </button>
                )}

            </form>

            <h2
                style={{
                    marginTop:
                        "40px",
                }}
            >
                Lista e Payments
            </h2>

            <div className="cards">

                {payments.map(
                    (p) => (

                        <div
                            className="card"
                            key={p.id}
                        >

                            <h2>

                                Payment #
                                {p.id}

                            </h2>

                            <p>

                                <strong>
                                    Invoice ID:
                                </strong>

                                {" "}

                                {p.invoice_id}

                            </p>

                            <p>

                                <strong>
                                    Amount:
                                </strong>

                                {" "}

                                {p.amount} €

                            </p>

                            <p>

                                <strong>
                                    Method:
                                </strong>

                                {" "}

                                {p.payment_method}

                            </p>

                            <p>

                                <strong>
                                    Status:
                                </strong>

                                {" "}

                                {p.statusi}

                            </p>

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

                        </div>
                    )
                )}

            </div>

        </div>
    );
}