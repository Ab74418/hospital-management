import { useEffect, useState } from "react";

export default function Payments() {
    const [payments, setPayments] = useState([]);

    const [formData, setFormData] = useState({
        invoice_id: "",
        amount: "",
        payment_method: "",
        statusi: ""
    });

    const fetchPayments = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/payments");
            const data = await res.json();
            setPayments(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchPayments();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:5000/api/payments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                alert("Payment u shtua me sukses");

                setFormData({
                    invoice_id: "",
                    amount: "",
                    payment_method: "",
                    statusi: ""
                });

                fetchPayments();
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Payments</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    name="invoice_id"
                    placeholder="Invoice ID"
                    value={formData.invoice_id}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={formData.amount}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="payment_method"
                    placeholder="Payment Method"
                    value={formData.payment_method}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="statusi"
                    placeholder="Statusi"
                    value={formData.statusi}
                    onChange={handleChange}
                />

                <button type="submit">
                    Add Payment
                </button>
            </form>

            <hr />

            <h2>Lista e Pagesave</h2>

            {payments.map((p) => (
                <div
                    key={p.id}
                    style={{
                        border: "1px solid #ccc",
                        padding: "10px",
                        marginBottom: "10px"
                    }}
                >
                    <p><strong>ID:</strong> {p.id}</p>
                    <p><strong>Invoice ID:</strong> {p.invoice_id}</p>
                    <p><strong>Amount:</strong> {p.amount} €</p>
                    <p><strong>Method:</strong> {p.payment_method}</p>
                    <p><strong>Status:</strong> {p.statusi}</p>
                </div>
            ))}
        </div>
    );
}