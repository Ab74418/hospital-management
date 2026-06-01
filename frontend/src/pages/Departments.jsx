import { useState } from "react";

export default function Departments() {
    const [departments, setDepartments] = useState([]);
    const [form, setForm] = useState({ emri: "" });
    const [editId, setEditId] = useState(null);

    async function fetchDepartments() {
        try {
            const res = await fetch("http://localhost:5000/api/departments");
            const data = await res.json();
            setDepartments(data);
        } catch (error) {
            console.log(error);
        }
    }

    if (departments.length === 0) {
        fetchDepartments();
    }

    function handleChange(e) {
        setForm({ emri: e.target.value });
    }

    function handleEdit(dep) {
        setEditId(dep.id);
        setForm({ emri: dep.emri || "" });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const url = editId
            ? `http://localhost:5000/api/departments/${editId}`
            : "http://localhost:5000/api/departments";

        const method = editId ? "PUT" : "POST";

        const res = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });

        const result = await res.json();

        if (!res.ok) {
            alert(result.message || "Gabim!");
            return;
        }

        alert(editId ? "Department u editua me sukses!" : "Department u shtua me sukses!");

        setForm({ emri: "" });
        setEditId(null);
        fetchDepartments();
    }

    async function handleDelete(id) {
        const confirmDelete = window.confirm(
            "A je e sigurt që don me fshi këtë department?"
        );

        if (!confirmDelete) return;

        const res = await fetch(`http://localhost:5000/api/departments/${id}`, {
            method: "DELETE",
        });

        const result = await res.json();

        if (!res.ok) {
            alert(result.message || "Gabim gjatë fshirjes!");
            return;
        }

        alert("Department u fshi me sukses!");
        fetchDepartments();
    }

    return (
        <div style={{ padding: "20px" }}>
            <h2>Departments</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Emri i department"
                    value={form.emri}
                    onChange={handleChange}
                    required
                />

                <button type="submit" style={{ marginLeft: "10px" }}>
                    {editId ? "Update" : "Add"}
                </button>
            </form>

            <hr />

            {departments.length === 0 ? (
                <p>Nuk ka departments.</p>
            ) : (
                departments.map((dep) => (
                    <div
                        key={dep.id}
                        style={{
                            border: "1px solid #ccc",
                            padding: "12px",
                            marginBottom: "10px",
                            borderRadius: "8px",
                        }}
                    >
                        <p>
                            <b>ID:</b> {dep.id * 100}D
                        </p>

                        <p>
                            <b>Emri:</b> {dep.emri}
                        </p>

                        <p>
                            <b>Përshkrimi:</b> {dep.pershkrimi || "Pa përshkrim"}
                        </p>

                        <p>
                            <b>Lokacioni:</b> {dep.lokacioni || "Pa lokacion"}
                        </p>

                        <button onClick={() => handleEdit(dep)}>Edit</button>

                        <button
                            onClick={() => handleDelete(dep.id)}
                            style={{
                                marginLeft: "10px",
                                color: "red",
                            }}
                        >
                            Delete
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}