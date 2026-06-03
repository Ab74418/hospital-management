import { useEffect, useState } from "react";

import {
    useNavigate
} from "react-router-dom";

export default function Specializations() {

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

    const [specializations,
        setSpecializations] =
        useState([]);

    const [form,
        setForm] =
        useState({

            emri: "",
        });

    const [editingId,
        setEditingId] =
        useState(null);

    useEffect(() => {

        fetchSpecializations();

    }, []);

    const fetchSpecializations =
        () => {

            fetch(
                "http://localhost:5000/api/specializations"
            )
                .then((res) =>
                    res.json()
                )

                .then((data) =>
                    setSpecializations(data)
                )

                .catch((err) =>
                    console.log(err));
        };

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

                    editingId

                        ?

                        `http://localhost:5000/api/specializations/${editingId}`

                        :

                        "http://localhost:5000/api/specializations";

                const method =

                    editingId
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

                    editingId

                        ?

                        "Specialization updated!"

                        :

                        "Specialization added!"
                );

                fetchSpecializations();

                setEditingId(null);

                setForm({

                    emri: "",
                });

            } catch (err) {

                console.log(err);

                alert(
                    "Error saving specialization"
                );
            }
        };

    const handleEdit =
        (spec) => {

            setEditingId(
                spec.id
            );

            setForm({

                emri:
                    spec.emri || "",
            });
        };

    const handleDelete =
        async (id) => {

            const confirmDelete =
                window.confirm(
                    "A dëshiron ta fshish këtë specialization?"
                );

            if (!confirmDelete)
                return;

            try {

                await fetch(
                    `http://localhost:5000/api/specializations/${id}`,
                    {
                        method:
                            "DELETE",
                    }
                );

                alert(
                    "Specialization deleted!"
                );

                fetchSpecializations();

            } catch (err) {

                console.log(err);
            }
        };

    return (

        <div className="spec-page">

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

                    marginBottom:
                        "20px",
                }}
            >
                Back
            </button>

            <h1>
                Specializations
            </h1>

            <form
                onSubmit={
                    handleSubmit
                }

                style={{

                    display:
                        "flex",

                    gap:
                        "15px",

                    marginBottom:
                        "30px",

                    flexWrap:
                        "wrap",
                }}
            >

                <input
                    type="text"

                    name="emri"

                    placeholder=
                    "Specialization Name"

                    value={
                        form.emri
                    }

                    onChange={
                        handleChange
                    }

                    required
                />

                <button
                    type="submit"
                >

                    {editingId

                        ?

                        "Update"

                        :

                        "Add"}

                </button>

            </form>

            <div className="spec-grid">

                {specializations.map(
                    (s) => (

                        <div
                            className="spec-card"

                            key={s.id}
                        >

                            <div className="spec-icon">
                                +
                            </div>

                            <h2>
                                {s.emri}
                            </h2>

                            <p>

                                <b>ID:</b>

                                {" "}

                                {s.id}

                            </p>

                            <p>

                                <b>Lloji:</b>

                                {" "}

                                Specializim mjekësor

                            </p>

                            <div className="spec-buttons">

                                <button
                                    className="spec-edit"

                                    onClick={() =>
                                        handleEdit(
                                            s
                                        )
                                    }
                                >
                                    Edit
                                </button>

                                <button
                                    className="spec-delete"

                                    onClick={() =>
                                        handleDelete(
                                            s.id
                                        )
                                    }
                                >
                                    Delete
                                </button>

                            </div>

                        </div>
                    )
                )}

            </div>

        </div>
    );
}