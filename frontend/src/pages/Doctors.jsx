import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Doctors() {
    const [doctors, setDoctors] = useState([]);
    const [departments, setDepartments] = useState([]);

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        surname: "",
        specialization: "",
        telefoni: "",
        department_id: "",
    });

    const fetchDoctors = () => {
        fetch("http://localhost:5000/api/doctors")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setDoctors(data);
                } else {
                    setDoctors([]);
                }
            })
            .catch((err) => console.log(err));
    };

    const fetchDepartments = () => {
        fetch("http://localhost:5000/api/departments")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setDepartments(data);
                } else {
                    setDepartments([]);
                }
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        fetchDoctors();
        fetchDepartments();
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:5000/api/doctors", {
                method: "POST",
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

            alert("Doctor u shtua me sukses!");

            setForm({
                name: "",
                surname: "",
                specialization: "",
                telefoni: "",
                department_id: "",
            });

            fetchDoctors();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                }}
            >
                <button onClick={() => navigate("/home")}>Back</button>

                <h1>Doctors</h1>

                <div></div>
            </div>

            <form
                onSubmit={handleSubmit}
                style={{
                    display: "grid",
                    gap: "15px",
                    marginBottom: "30px",
                }}
            >
                <input
                    type="text"
                    name="name"
                    placeholder="Emri"
                    value={form.name}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="surname"
                    placeholder="Mbiemri"
                    value={form.surname}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="specialization"
                    placeholder="Specializimi"
                    value={form.specialization}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="telefoni"
                    placeholder="Telefoni"
                    value={form.telefoni}
                    onChange={handleChange}
                    required
                />

                <select
                    name="department_id"
                    value={form.department_id}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Department</option>

                    {departments.map((d) => (
                        <option key={d.id} value={d.id}>
                            {d.emri}
                        </option>
                    ))}
                </select>

                <button type="submit">Add Doctor</button>
            </form>

            <div
                style={{
                    display: "grid",
                    gap: "15px",
                }}
            >
                {doctors.map((doctor) => (
                    <div
                        key={doctor.id}
                        style={{
                            border: "1px solid #ccc",
                            padding: "20px",
                            borderRadius: "10px",
                            background: "#fff",
                        }}
                    >
                        <h3>
                            {doctor.name} {doctor.surname}
                        </h3>

                        <p>
                            <b>Specializimi:</b> {doctor.specialization}
                        </p>

                        <p>
                            <b>Telefoni:</b> {doctor.telefoni}
                        </p>

                        <p>
                            <b>Department:</b>{" "}
                            {doctor.departments?.emri || "Pa department"}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Doctors;