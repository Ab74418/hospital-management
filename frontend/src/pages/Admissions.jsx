import { useState } from "react";

export default function Admissions() {
    const [form, setForm] = useState({
        patient_id: "",
        room_id: "",
        admit_date: "",
        status: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        await fetch("http://localhost:5000/api/admissions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });

        alert("Admission added");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input placeholder="Patient ID" onChange={e => setForm({ ...form, patient_id: e.target.value })} />
            <input placeholder="Room ID" onChange={e => setForm({ ...form, room_id: e.target.value })} />
            <input type="date" onChange={e => setForm({ ...form, admit_date: e.target.value })} />
            <input placeholder="Status" onChange={e => setForm({ ...form, status: e.target.value })} />
            <button type="submit">Add</button>
        </form>
    );
}