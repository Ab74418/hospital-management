import { useEffect, useState } from "react";

export default function Schedules() {
    const [schedules, setSchedules] = useState([]);

    const [form, setForm] = useState({
        doctor_id: "",
        dita: "",
        ora_fillimit: "",
        ora_mbarimit: "",
    });

    const [editId, setEditId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("http://localhost:5000/schedules");
                const data = await res.json();
                setSchedules(data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);

    const fetchSchedules = () => {
        fetch("http://localhost:5000/schedules")
            .then((res) => res.json())
            .then((data) => setSchedules(data))
            .catch((err) => console.log(err));
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleEdit = (sch) => {
        setEditId(sch.id);

        setForm({
            doctor_id: sch.doctor_id,
            dita: sch.dita,
            ora_fillimit: sch.ora_fillimit?.slice(11, 16),
            ora_mbarimit: sch.ora_mbarimit?.slice(11, 16),
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = editId
            ? `http://localhost:5000/schedules/${editId}`
            : "http://localhost:5000/schedules";

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

        alert(editId ? "Schedule u editua!" : "Schedule u shtua!");

        setForm({
            doctor_id: "",
            dita: "",
            ora_fillimit: "",
            ora_mbarimit: "",
        });

        setEditId(null);
        fetchSchedules();
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("A je e sigurt që don me fshi këtë schedule?");
        if (!confirmDelete) return;

        await fetch(`http://localhost:5000/schedules/${id}`, {
            method: "DELETE",
        });

        fetchSchedules();
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Schedules</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    name="doctor_id"
                    placeholder="Doctor ID"
                    value={form.doctor_id}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="dita"
                    placeholder="Dita (p.sh Monday)"
                    value={form.dita}
                    onChange={handleChange}
                    required
                />

                <input
                    type="time"
                    name="ora_fillimit"
                    value={form.ora_fillimit}
                    onChange={handleChange}
                    required
                />

                <input
                    type="time"
                    name="ora_mbarimit"
                    value={form.ora_mbarimit}
                    onChange={handleChange}
                    required
                />

                <button type="submit">
                    {editId ? "Update" : "Add"}
                </button>
            </form>

            <hr />

            {schedules.map((sch) => (
                <div
                    key={sch.id}
                    style={{
                        border: "1px solid #ccc",
                        padding: "12px",
                        marginBottom: "10px",
                    }}
                >
                    <p><b>Doctor ID:</b> {sch.doctor_id}</p>
                    <p><b>Doctor:</b> {sch.doctors?.emri} {sch.doctors?.mbiemri}</p>
                    <p><b>Dita:</b> {sch.dita}</p>
                    <p><b>Ora Fillimit:</b> {sch.ora_fillimit?.slice(11, 16)}</p>
                    <p><b>Ora Mbarimit:</b> {sch.ora_mbarimit?.slice(11, 16)}</p>

                    <button onClick={() => handleEdit(sch)}>
                        Edit
                    </button>

                    <button
                        onClick={() => handleDelete(sch.id)}
                        style={{ marginLeft: "10px", color: "red" }}
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}