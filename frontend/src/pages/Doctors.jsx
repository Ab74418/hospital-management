import { useEffect, useState } from "react";

import {
    useNavigate
} from "react-router-dom";

function Doctors() {

    const [doctors, setDoctors] =
        useState([]);

    const [departments, setDepartments] =
        useState([]);

    const [editId, setEditId] =
        useState(null);

    const navigate =
        useNavigate();

    const [form, setForm] =
        useState({
            emri: "",
            mbiemri: "",
            specializimi: "",
            telefoni: "",
            department_id: "",
        });

    const fetchDoctors = async () => {

        try {

            const res = await fetch(
                "http://localhost:5000/api/doctors"
            );

            const data = await res.json();

            setDoctors(
                Array.isArray(data)
                    ? data
                    : []
            );

        } catch (err) {

            console.log(err);
        }
    };

    const fetchDepartments = async () => {

        try {

            const res = await fetch(
                "http://localhost:5000/api/departments"
            );

            const data = await res.json();

            setDepartments(
                Array.isArray(data)
                    ? data
                    : []
            );

        } catch (err) {

            console.log(err);
        }
    };

    useEffect(() => {

        fetchDoctors();

        fetchDepartments();

    }, []);

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]:
                e.target.value,
        });
    };

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            try {

                const url = editId

                    ?

                    `http://localhost:5000/api/doctors/${editId}`

                    :

                    "http://localhost:5000/api/doctors";

                const method =
                    editId
                        ? "PUT"
                        : "POST";

                const doctorData = {

                    emri:
                        form.emri,

                    mbiemri:
                        form.mbiemri,

                    specializimi:
                        form.specializimi,

                    telefoni:
                        form.telefoni,

                    department_id:
                        Number(
                            form.department_id
                        ),
                };

                const res =
                    await fetch(url, {

                        method,

                        headers: {
                            "Content-Type":
                                "application/json",
                        },

                        body:
                            JSON.stringify(
                                doctorData
                            ),
                    });

                const result =
                    await res.json();

                if (!res.ok) {

                    alert(
                        result.message
                        || "Gabim!"
                    );

                    return;
                }

                alert(

                    editId

                        ?

                        "Doctor updated!"

                        :

                        "Doctor added!"
                );

                setForm({

                    emri: "",

                    mbiemri: "",

                    specializimi: "",

                    telefoni: "",

                    department_id: "",
                });

                setEditId(null);

                fetchDoctors();

            } catch (err) {

                console.log(err);
            }
        };

    const handleDelete =
        async (id) => {

            const confirmDelete =
                window.confirm(
                    "A je e sigurt?"
                );

            if (!confirmDelete)
                return;

            try {

                await fetch(
                    `http://localhost:5000/api/doctors/${id}`,
                    {
                        method:
                            "DELETE",
                    }
                );

                fetchDoctors();

            } catch (err) {

                console.log(err);
            }
        };

    const handleEdit =
        (doctor) => {

            setEditId(
                doctor.id
            );

            setForm({

                emri:
                    doctor.emri || "",

                mbiemri:
                    doctor.mbiemri || "",

                specializimi:
                    doctor.specializimi || "",

                telefoni:
                    doctor.telefoni || "",

                department_id:
                    doctor.department_id || "",
            });
        };

    return (

        <div className="page-card">

            <div
                style={{
                    display: "flex",
                    justifyContent:
                        "space-between",
                    alignItems:
                        "center",
                    marginBottom:
                        "20px",
                }}
            >

                <button
                    onClick={() =>
                        navigate("/home")
                    }
                >
                    Back
                </button>

                <h1>
                    Doctors
                </h1>

                <div></div>

            </div>

            <form
                onSubmit={
                    handleSubmit
                }
                className="patient-form"
            >

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
                    type="text"
                    name="specializimi"
                    placeholder="Specializimi"
                    value={
                        form.specializimi
                    }
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
                    value={
                        form.department_id
                    }
                    onChange={
                        handleChange
                    }
                    required
                >

                    <option value="">
                        Select Department
                    </option>

                    {departments.map(
                        (d) => (

                            <option
                                key={d.id}
                                value={d.id}
                            >

                                {d.emri}

                            </option>
                        )
                    )}

                </select>

                <button type="submit">

                    {editId

                        ?

                        "Update Doctor"

                        :

                        "Add Doctor"}

                </button>

            </form>

            <div className="cards">

                {doctors.map(
                    (doctor) => (

                        <div
                            className="card"
                            key={doctor.id}
                        >

                            <h2>

                                {doctor.emri}
                                {" "}
                                {doctor.mbiemri}

                            </h2>

                            <p>

                                <strong>
                                    Specializimi:
                                </strong>

                                {" "}

                                {
                                    doctor.specializimi
                                }

                            </p>

                            <p>

                                <strong>
                                    Telefoni:
                                </strong>

                                {" "}

                                {
                                    doctor.telefoni
                                }

                            </p>

                            <p>

                                <strong>
                                    Department:
                                </strong>

                                {" "}

                                {
                                    departments.find(
                                        (d) =>
                                            d.id ===
                                            doctor.department_id
                                    )?.emri
                                    ||
                                    "Pa department"
                                }

                            </p>

                            <button
                                onClick={() =>
                                    handleEdit(
                                        doctor
                                    )
                                }
                            >
                                Edit
                            </button>

                            <button
                                onClick={() =>
                                    handleDelete(
                                        doctor.id
                                    )
                                }

                                style={{
                                    marginLeft:
                                        "10px",
                                    background:
                                        "crimson",
                                }}
                            >
                                Delete
                            </button>

                        </div>
                    )
                )}

            </div>

        </div>
    );
}

export default Doctors;