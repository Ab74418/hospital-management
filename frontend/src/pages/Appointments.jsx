import { useEffect, useState } from "react";

export default function Appointments() {
    const [appointments, setAppointments] = useState([]);

    const [form, setForm] = useState({
        patient_id: "",
        doctor_id: "",
        data: "",
        ora: "",
        statusi: "",
        shenime: "",
    });

    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = () => {
        fetch("http://localhost:5000/appointments")
            .then((res) => res.json())
            .then((data) => setAppointments(data))
            .catch((err) => console.log(err));
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleEdit = (app) => {
        setEditId(app.id);

        setForm({
            patient_id: app.patient_id,
            doctor_id: app.doctor_id,
            data: app.data.slice(0, 10),
            ora: app.ora.slice(11, 16),
            statusi: app.statusi,
            shenime: app.shenime || "",
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const overlap = appointments.find((a) =>
            Number(a.doctor_id) === Number(form.doctor_id) &&
            a.data.slice(0, 10) === form.data &&
            a.ora.slice(11, 16) === form.ora &&
            a.id !== editId
        );

        if (overlap) {
            alert("Ky doktor ka termin në këtë datë dhe orë!");
            return;
        }

        const url = editId
            ? `http://localhost:5000/appointments/${editId}`
            : "http://localhost:5000/appointments";

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

        alert(editId ? "Appointment u editua!" : "Appointment u shtua!");

        setForm({
            patient_id: "",
            doctor_id: "",
            data: "",
            ora: "",
            statusi: "",
            shenime: "",
        });

        setEditId(null);
        fetchAppointments();
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Appointments</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    name="patient_id"
                    placeholder="Patient ID"
                    value={form.patient_id}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="doctor_id"
                    placeholder="Doctor ID"
                    value={form.doctor_id}
                    onChange={handleChange}
                    required
                />

                <input
                    type="date"
                    name="data"
                    value={form.data}
                    onChange={handleChange}
                    required
                />

                <input
                    type="time"
                    name="ora"
                    value={form.ora}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="statusi"
                    placeholder="Statusi"
                    value={form.statusi}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="shenime"
                    placeholder="Shënime"
                    value={form.shenime}
                    onChange={handleChange}
                />

                <button type="submit">
                    {editId ? "Update" : "Add"}
                </button>
            </form>

            <hr />

            {appointments.map((app) => (
                <div
                    key={app.id}
                    style={{
                        border: "1px solid #ccc",
                        padding: "12px",
                        marginBottom: "10px",
                    }}
                >
                    <p><b>Pacienti:</b> {app.patients?.emri} {app.patients?.mbiemri}</p>
                    <p><b>Doktori:</b> {app.doctors?.emri} {app.doctors?.mbiemri}</p>
                    <p><b>Data:</b> {app.data?.slice(0, 10)}</p>
                    <p><b>Ora:</b> {app.ora?.slice(11, 16)}</p>
                    <p><b>Statusi:</b> {app.statusi}</p>
                    <p><b>Shënime:</b> {app.shenime}</p>

                    <button onClick={() => handleEdit(app)}>
                        Edit
                    </button>

                    <button onClick={() => handleDelete(app.id)}>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}