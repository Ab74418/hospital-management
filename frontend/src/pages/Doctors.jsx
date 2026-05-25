import { useEffect, useState } from "react";

function Doctors() {

    const [doctors, setDoctors] = useState([]);

    const [form, setForm] = useState({
        emri: "",
        mbiemri: "",
        department_id: "",
    });

    const fetchDoctors = () => {

        fetch("http://localhost:5000/api/doctors")
            .then((res) => res.json())
            .then((data) => setDoctors(data))
            .catch((err) => console.log(err));
    };

    useEffect(() => {

        fetchDoctors();

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

            const res = await fetch(
                "http://localhost:5000/api/doctors",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",
                    },

                    body: JSON.stringify(form),
                }
            );

            const result = await res.json();

            if (!res.ok) {

                alert(result.message);

                return;
            }

            alert(
                "Doctor u shtua me sukses!"
            );

            setForm({
                emri: "",
                mbiemri: "",
                department_id: "",
            });

            fetchDoctors();

        } catch (err) {

            console.log(err);
        }
    };

    return (

        <div style={{ padding: "20px" }}>

            <h2>Doctors</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="emri"
                    placeholder="Emri"
                    value={form.emri}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="mbiemri"
                    placeholder="Mbiemri"
                    value={form.mbiemri}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="department_id"
                    placeholder="Department ID"
                    value={form.department_id}
                    onChange={handleChange}
                    required
                />

                <button type="submit">
                    Add Doctor
                </button>

            </form>

            <hr />

            {doctors.map((doctor) => (

                <div
                    key={doctor.id}
                    style={{
                        border: "1px solid #ccc",
                        padding: "12px",
                        marginBottom: "10px",
                    }}
                >

                    <p>
                        <b>ID:</b> {doctor.id}
                    </p>

                    <p>
                        <b>Emri:</b> {doctor.emri}
                    </p>

                    <p>
                        <b>Mbiemri:</b>{" "}
                        {doctor.mbiemri}
                    </p>

                    <p>
                        <b>Department ID:</b>{" "}
                        {doctor.department_id}
                    </p>

                </div>
            ))}

        </div>
    );
}

export default Doctors;