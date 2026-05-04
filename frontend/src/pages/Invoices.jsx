import { useState } from "react";

export default function Invoices() {
    const [form, setForm] = useState({
        admission_id: "",
        amount: "",
        status: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        await fetch("http://localhost:5000/api/invoices", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });

        alert("Invoice added");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input placeholder="Admission ID" onChange={e => setForm({ ...form, admission_id: e.target.value })} />
            <input placeholder="Amount" onChange={e => setForm({ ...form, amount: e.target.value })} />
            <input placeholder="Status" onChange={e => setForm({ ...form, status: e.target.value })} />
            <button type="submit">Add</button>
        </form>
    );
}