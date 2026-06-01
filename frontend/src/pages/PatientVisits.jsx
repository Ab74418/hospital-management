import { useEffect, useState } from "react";

export default function PatientVisits() {
    const [visits, setVisits] = useState([]);

    const [form, setForm] = useState({
        patient_id: "",
        doctor_id: "",
        diagnoza: "",
        trajtimi: "",
        data_vizites: "",
        ora_vizites: "",
    });

    const [editId, setEditId] = useState(null);
    const [patientFilter, setPatientFilter] = useState("");
    const [doctorFilter, setDoctorFilter] = useState("");

    useEffect(() => {
        fetchVisits();
    }, []);

    const fetchVisits = async () => {
        try {
            const res = await fetch("http://localhost:5000/patient-visits");
            const data = await res.json();
            setVisits(data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleEdit = (visit) => {
        setEditId(visit.id);

        setForm({
            patient_id: visit.patient_id,
            doctor_id: visit.doctor_id,
            diagnoza: visit.diagnoza,
            trajtimi: visit.trajtimi,
            data_vizites: visit.data_vizites?.slice(0, 10),
            ora_vizites: visit.ora_vizites,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = editId
            ? `http://localhost:5000/patient-visits/${editId}`
            : "http://localhost:5000/patient-visits";

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

        alert(editId ? "Vizita u editua!" : "Vizita u shtua!");

        setForm({
            patient_id: "",
            doctor_id: "",
            diagnoza: "",
            trajtimi: "",
            data_vizites: "",
            ora_vizites: "",
        });

        setEditId(null);
        fetchVisits();
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("A je e sigurt që don me fshi këtë vizitë?");
        if (!confirmDelete) return;

        await fetch(`http://localhost:5000/patient-visits/${id}`, {
            method: "DELETE",
        });

        fetchVisits();
    };

    const filteredVisits = visits.filter((visit) => {
        const matchPatient = patientFilter
            ? Number(visit.patient_id) === Number(patientFilter)
            : true;

        const matchDoctor = doctorFilter
            ? Number(visit.doctor_id) === Number(doctorFilter)
            : true;

        return matchPatient && matchDoctor;
    });

    return (
        <div style={{ padding: "20px" }}>
            <h2>Patient Visits History</h2>

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
                    type="text"
                    name="diagnoza"
                    placeholder="Diagnoza"
                    value={form.diagnoza}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="trajtimi"
                    placeholder="Trajtimi"
                    value={form.trajtimi}
                    onChange={handleChange}
                    required
                />

                <input
                    type="date"
                    name="data_vizites"
                    value={form.data_vizites}
                    onChange={handleChange}
                    required
                />

                <input
                    type="time"
                    name="ora_vizites"
                    value={form.ora_vizites}
                    onChange={handleChange}
                    required
                />

                <button type="submit">
                    {editId ? "Update Visit" : "Add Visit"}
                </button>
            </form>

            <hr />

            <h3>Kërko vizitat</h3>

            <input
                type="number"
                placeholder="Kerko sipas Patient ID"
                value={patientFilter}
                onChange={(e) => setPatientFilter(e.target.value)}
            />

            <input
                type="number"
                placeholder="Kerko sipas Doctor ID"
                value={doctorFilter}
                onChange={(e) => setDoctorFilter(e.target.value)}
                style={{ marginLeft: "10px" }}
            />

            <button
                onClick={() => {
                    setPatientFilter("");
                    setDoctorFilter("");
                }}
                style={{ marginLeft: "10px" }}
            >
                Shfaq të gjitha
            </button>

            <hr />

            {filteredVisits.map((visit) => (
                <div
                    key={visit.id}
                    style={{
                        border: "1px solid #ccc",
                        padding: "12px",
                        marginBottom: "10px",
                    }}
                >
                    <p><b>ID:</b> {visit.id}</p>
                    <p><b>Pacienti:</b> {visit.patients?.emri} {visit.patients?.mbiemri}</p>
                    <p><b>Patient ID:</b> {visit.patient_id}</p>
                    <p><b>Doktori:</b> {visit.doctors?.emri} {visit.doctors?.mbiemri}</p>
                    <p><b>Doctor ID:</b> {visit.doctor_id}</p>
                    <p><b>Diagnoza:</b> {visit.diagnoza}</p>
                    <p><b>Trajtimi:</b> {visit.trajtimi}</p>
                    <p><b>Data:</b> {visit.data_vizites?.slice(0, 10)}</p>
                    <p><b>Ora:</b> {visit.ora_vizites}</p>

                    <button onClick={() => handleEdit(visit)}>
                        Edit
                    </button>

                    <button
                        onClick={() => handleDelete(visit.id)}
                        style={{ marginLeft: "10px", color: "red" }}
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}