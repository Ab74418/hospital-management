import { useEffect, useState } from "react";

export default function DoctorSpecializations() {
    const [items, setItems] = useState([]);

    const [form, setForm] = useState({
        doctor_id: "",
        specialization_id: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("http://localhost:5000/doctor-specializations");
                const data = await res.json();
                setItems(data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);

    const fetchItems = async () => {
        try {
            const res = await fetch("http://localhost:5000/doctor-specializations");
            const data = await res.json();
            setItems(data);
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("http://localhost:5000/doctor-specializations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                doctor_id: Number(form.doctor_id),
                specialization_id: Number(form.specialization_id),
            }),
        });

        const result = await res.json();

        if (!res.ok) {
            alert(result.message);
            return;
        }

        alert("Specializimi iu shtua doktorit!");

        setForm({
            doctor_id: "",
            specialization_id: "",
        });

        fetchItems();
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("A je e sigurt që don me fshi këtë lidhje?");
        if (!confirmDelete) return;

        await fetch(`http://localhost:5000/doctor-specializations/${id}`, {
            method: "DELETE",
        });

        fetchItems();
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Doctor Specializations</h2>

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
                    type="number"
                    name="specialization_id"
                    placeholder="Specialization ID"
                    value={form.specialization_id}
                    onChange={handleChange}
                    required
                />

                <button type="submit">
                    Add
                </button>
            </form>

            <hr />

            {items.map((item) => (
                <div
                    key={item.id}
                    style={{
                        border: "1px solid #ccc",
                        padding: "12px",
                        marginBottom: "10px",
                    }}
                >
                    <p><b>ID:</b> {item.id}</p>
                    <p><b>Doctor:</b> {item.doctors?.emri} {item.doctors?.mbiemri}</p>
                    <p><b>Doctor ID:</b> {item.doctor_id}</p>
                    <p><b>Specialization:</b> {item.specializations?.emri}</p>
                    <p><b>Specialization ID:</b> {item.specialization_id}</p>

                    <button
                        onClick={() => handleDelete(item.id)}
                        style={{ color: "red" }}
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}