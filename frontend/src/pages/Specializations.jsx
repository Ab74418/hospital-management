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

    const handleEdit = (schedule) => {
        setEditId(schedule.id);

        setForm({
            doctor_id: schedule.doctor_id,
            dita: schedule.dita,
            ora_fillimit: schedule.ora_fillimit,
            ora_mbarimit: schedule.ora_mbarimit,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.ora_fillimit >= form.ora_mbarimit) {
            alert("Ora e fillimit duhet me qenë më e vogël se ora e mbarimit!");
            return;
        }

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
                    placeholder="Dita"
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
                    {editId ? "Update Schedule" : "Add Schedule"}
                </button>
            </form>

            <hr />

            {schedules.map((schedule) => (
                <div
                    key={schedule.id}
                    style={{
                        border: "1px solid #ccc",
                        padding: "12px",
                        marginBottom: "10px",
                    }}
                >
                    <p><b>ID:</b> {schedule.id}</p>
                    <p><b>Doctor ID:</b> {schedule.doctor_id}</p>
                    <p><b>Doctor:</b> {schedule.doctors?.emri} {schedule.doctors?.mbiemri}</p>
                    <p><b>Dita:</b> {schedule.dita}</p>
                    <p><b>Ora Fillimit:</b> {schedule.ora_fillimit}</p>
                    <p><b>Ora Mbarimit:</b> {schedule.ora_mbarimit}</p>

                    <button onClick={() => handleEdit(schedule)}>
                        Edit
                    </button>

                    <button
                        onClick={() => handleDelete(schedule.id)}
                        style={{ marginLeft: "10px", color: "red" }}
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}