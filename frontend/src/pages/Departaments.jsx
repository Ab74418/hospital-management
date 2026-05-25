import { useEffect, useState } from "react";

export default function Departments() {
    const [departments, setDepartments] = useState([]);

    const [form, setForm] = useState({
        emri: "",
    });

    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = () => {
        fetch("http://localhost:5000/departments")
            .then((res) => res.json())
            .then((data) => setDepartments(data))
            .catch((err) => console.log(err));
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            emri: e.target.value,
        });
    };

    const handleEdit = (dep) => {
        setEditId(dep.id);
        setForm({
            emri: dep.emri,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = editId
            ? `http://localhost:5000/departments/${editId}`
            : "http://localhost:5000/departments";

        const method = editId ? "PUT" : "POST";

        const res = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });

        const result = await res.json();

        if (!res.ok) {
            alert(result.message);
            return;
        }

        alert(editId ? "Department u editua!" : "Department u shtua!");

        setForm({ emri: "" });
        setEditId(null);
        fetchDepartments();
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("A je e sigurt që don me fshi këtë department?");
        if (!confirmDelete) return;

        await fetch(`http://localhost:5000/departments/${id}`, {
            method: "DELETE",
        });

        fetchDepartments();
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Departments</h2>

            {/* FORM */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Emri i department"
                    value={form.emri}
                    onChange={handleChange}
                    required
                />

                <button type="submit">
                    {editId ? "Update" : "Add"}
                </button>
            </form>

            <hr />

            {/* LISTA */}
            {departments.map((dep) => (
                <div
                    key={dep.id}
                    style={{
                        border: "1px solid #ccc",
                        padding: "12px",
                        marginBottom: "10px",
                    }}
                >
                    <p><b>ID:</b> {dep.id}</p>
                    <p><b>Emri:</b> {dep.emri}</p>

                    <button onClick={() => handleEdit(dep)}>
                        Edit
                    </button>

                    <button
                        onClick={() => handleDelete(dep.id)}
                        style={{ marginLeft: "10px", color: "red" }}
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}