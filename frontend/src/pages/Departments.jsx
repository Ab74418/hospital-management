import { useEffect, useState } from "react";

import {
    useNavigate
} from "react-router-dom";

export default function Departments() {

    const navigate =
        useNavigate();

    const role =
        localStorage.getItem("role");

    const handleBack = () => {

        switch (role) {

            case "admin":
                navigate("/home");
                break;

            case "doctor":
                navigate("/doctor");
                break;

            case "receptionist":
                navigate("/receptionist");
                break;

            case "user":
                navigate("/user");
                break;

            default:
                navigate("/");
        }
    };

    const [departments,
        setDepartments] =
        useState([]);

    const [editId,
        setEditId] =
        useState(null);

    const [form, setForm] =
        useState({

            emri: "",

            pershkrimi: "",

            lokacioni: "",
        });

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

                        `http://localhost:5000/api/departments/${editId}`

                        :

                        "http://localhost:5000/api/departments";

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

                alert(

                    editId

                        ?

                        "Department updated!"

                        :

                        "Department added!"
                );

                setForm({

                    emri: "",

                    pershkrimi: "",

                    lokacioni: "",
                });

                setEditId(null);

                fetchDepartments();

            } catch (err) {

                console.log(err);

                alert(
                    "Error saving department"
                );
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
                    `http://localhost:5000/api/departments/${id}`,
                    {
                        method:
                            "DELETE",
                    }
                );

                alert(
                    "Department deleted!"
                );

                fetchDepartments();

            } catch (err) {

                console.log(err);
            }
        };

    const handleEdit =
        (department) => {

            setEditId(
                department.id
            );

            setForm({

                emri:
                    department.emri || "",

                pershkrimi:
                    department.pershkrimi || "",

                lokacioni:
                    department.lokacioni || "",
            });
        };

    return (

        <div className="page-card">

            <div
                style={{

                    display:
                        "flex",

                    justifyContent:
                        "space-between",

                    alignItems:
                        "center",

                    marginBottom:
                        "20px",

                    flexWrap:
                        "wrap",

                    gap:
                        "15px",
                }}
            >

                <button
                    onClick={
                        handleBack
                    }

                    style={{

                        background:
                            "#1ea5e7",

                        color:
                            "white",

                        border:
                            "none",

                        padding:
                            "14px 24px",

                        borderRadius:
                            "14px",

                        fontSize:
                            "18px",

                        fontWeight:
                            "bold",

                        cursor:
                            "pointer",
                    }}
                >
                    Back
                </button>

                <h1>
                    Departments
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

                    placeholder=
                    "Emri i department"

                    value={
                        form.emri
                    }

                    onChange={
                        handleChange
                    }

                    required
                />

                <input
                    type="text"

                    name="pershkrimi"

                    placeholder=
                    "Pershkrimi"

                    value={
                        form.pershkrimi
                    }

                    onChange={
                        handleChange
                    }

                    required
                />

                <input
                    type="text"

                    name="lokacioni"

                    placeholder=
                    "Salla / Lokacioni"

                    value={
                        form.lokacioni
                    }

                    onChange={
                        handleChange
                    }

                    required
                />

                <button
                    type="submit"
                >

                    {editId

                        ?

                        "Update Department"

                        :

                        "Add Department"}

                </button>

            </form>

            <div className="cards">

                {departments.map(
                    (department) => (

                        <div
                            className="card"

                            key={
                                department.id
                            }
                        >

                            <h2>

                                {
                                    department.emri
                                }

                            </h2>

                            <p>

                                <strong>
                                    ID:
                                </strong>

                                {" "}

                                {
                                    department.id
                                }

                            </p>

                            <p>

                                <strong>
                                    Pershkrimi:
                                </strong>

                                {" "}

                                {
                                    department.pershkrimi
                                }

                            </p>

                            <p>

                                <strong>
                                    Salla:
                                </strong>

                                {" "}

                                {
                                    department.lokacioni
                                }

                            </p>

                            <button
                                onClick={() =>
                                    handleEdit(
                                        department
                                    )
                                }
                            >
                                Edit
                            </button>

                            <button
                                onClick={() =>
                                    handleDelete(
                                        department.id
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