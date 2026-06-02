import { useEffect, useState } from "react";

import {
    useNavigate
} from "react-router-dom";

export default function Nurses() {

    const navigate =
        useNavigate();

    const [nurses, setNurses] =
        useState([]);

    const [departments,
        setDepartments] =
        useState([]);

    const [editId,
        setEditId] =
        useState(null);

    const [form, setForm] =
        useState({

            emri: "",

            mbiemri: "",

            department_id: "",

            turni: "",
        });

    const fetchNurses =
        async () => {

            try {

                const res =
                    await fetch(
                        "http://localhost:5000/api/nurses"
                    );

                const data =
                    await res.json();

                setNurses(
                    Array.isArray(data)
                        ? data
                        : []
                );

            } catch (err) {

                console.log(err);
            }
        };

    const fetchDepartments =
        async () => {

            try {

                const res =
                    await fetch(
                        "http://localhost:5000/api/departments"
                    );

                const data =
                    await res.json();

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

        fetchNurses();

        fetchDepartments();

    }, []);

    const handleChange =
        (e) => {

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

                const url =

                    editId

                        ?

                        `http://localhost:5000/api/nurses/${editId}`

                        :

                        "http://localhost:5000/api/nurses";

                const method =

                    editId
                        ? "PUT"
                        : "POST";

                const res =
                    await fetch(url, {

                        method,

                        headers: {
                            "Content-Type":
                                "application/json",
                        },

                        body:
                            JSON.stringify(
                                form
                            ),
                    });

                if (!res.ok) {

                    throw new Error(
                        "Gabim"
                    );
                }

                setForm({

                    emri: "",

                    mbiemri: "",

                    department_id:
                        "",

                    turni: "",
                });

                setEditId(null);

                fetchNurses();

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
                    `http://localhost:5000/api/nurses/${id}`,
                    {
                        method:
                            "DELETE",
                    }
                );

                fetchNurses();

            } catch (err) {

                console.log(err);
            }
        };

    const handleEdit =
        (nurse) => {

            setEditId(
                nurse.id
            );

            setForm({

                emri:
                    nurse.emri || "",

                mbiemri:
                    nurse.mbiemri || "",

                department_id:
                    nurse.department_id || "",

                turni:
                    nurse.turni || "",
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
                    Nurses
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

                <input
                    type="text"
                    name="turni"
                    placeholder="Turni"
                    value={form.turni}
                    onChange={handleChange}
                    required
                />

                <button
                    type="submit"
                >

                    {editId

                        ?

                        "Update Nurse"

                        :

                        "Add Nurse"}

                </button>

            </form>

            <div className="cards">

                {nurses.map(
                    (nurse) => (

                        <div
                            className="card"
                            key={nurse.id}
                        >

                            <h2>

                                {nurse.emri}
                                {" "}
                                {nurse.mbiemri}

                            </h2>

                            <p>

                                <strong>
                                    Department:
                                </strong>

                                {" "}

                                {
                                    departments.find(
                                        (d) =>
                                            d.id
                                            ===
                                            nurse.department_id
                                    )?.emri

                                    ||

                                    "Pa department"
                                }

                            </p>

                            <p>

                                <strong>
                                    Turni:
                                </strong>

                                {" "}

                                {nurse.turni}

                            </p>

                            <button
                                onClick={() =>
                                    handleEdit(
                                        nurse
                                    )
                                }
                            >
                                Edit
                            </button>

                            <button
                                onClick={() =>
                                    handleDelete(
                                        nurse.id
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