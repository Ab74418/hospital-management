import { useEffect, useState } from "react";

import {
    useNavigate
} from "react-router-dom";

export default function DoctorSpecializations() {

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

    const [items,
        setItems] =
        useState([]);

    const [form,
        setForm] =
        useState({

            doctor_id: "",

            specialization_id: "",
        });

    useEffect(() => {

        fetchItems();

    }, []);

    const fetchItems =
        async () => {

            try {

                const res =
                    await fetch(
                        "http://localhost:5000/doctor-specializations"
                    );

                const data =
                    await res.json();

                setItems(data);

            } catch (err) {

                console.log(err);
            }
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

                const res =
                    await fetch(
                        "http://localhost:5000/doctor-specializations",
                        {

                            method:
                                "POST",

                            headers: {
                                "Content-Type":
                                    "application/json",
                            },

                            body:
                                JSON.stringify({

                                    doctor_id:
                                        Number(
                                            form.doctor_id
                                        ),

                                    specialization_id:
                                        Number(
                                            form.specialization_id
                                        ),
                                }),
                        }
                    );

                const result =
                    await res.json();

                if (!res.ok) {

                    alert(
                        result.message
                    );

                    return;
                }

                alert(
                    "Specializimi iu shtua doktorit!"
                );

                setForm({

                    doctor_id: "",

                    specialization_id: "",
                });

                fetchItems();

            } catch (err) {

                console.log(err);

                alert(
                    "Error adding specialization"
                );
            }
        };

    const handleDelete =
        async (id) => {

            const confirmDelete =
                window.confirm(
                    "A je e sigurt që don me fshi këtë lidhje?"
                );

            if (!confirmDelete)
                return;

            try {

                await fetch(
                    `http://localhost:5000/doctor-specializations/${id}`,
                    {
                        method:
                            "DELETE",
                    }
                );

                alert(
                    "Deleted successfully!"
                );

                fetchItems();

            } catch (err) {

                console.log(err);
            }
        };

    return (

        <div
            style={{
                padding: "20px",
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

                    marginBottom:
                        "20px",
                }}
            >
                Back
            </button>

            <h2>
                Doctor Specializations
            </h2>

            <form
                onSubmit={
                    handleSubmit
                }

                style={{

                    display:
                        "flex",

                    flexDirection:
                        "column",

                    gap:
                        "15px",

                    maxWidth:
                        "400px",

                    marginBottom:
                        "30px",
                }}
            >

                <input
                    type="number"

                    name="doctor_id"

                    placeholder=
                    "Doctor ID"

                    value={
                        form.doctor_id
                    }

                    onChange={
                        handleChange
                    }

                    required
                />

                <input
                    type="number"

                    name="specialization_id"

                    placeholder=
                    "Specialization ID"

                    value={
                        form.specialization_id
                    }

                    onChange={
                        handleChange
                    }

                    required
                />

                <button
                    type="submit"
                >
                    Add
                </button>

            </form>

            <hr />

            {items.map((item) => (

                <div
                    key={item.id}

                    style={{

                        border:
                            "1px solid #ccc",

                        padding:
                            "12px",

                        marginBottom:
                            "10px",

                        borderRadius:
                            "12px",
                    }}
                >

                    <p>
                        <b>ID:</b>
                        {" "}
                        {item.id}
                    </p>

                    <p>
                        <b>Doctor:</b>
                        {" "}
                        {
                            item.doctors?.emri
                        }

                        {" "}

                        {
                            item.doctors?.mbiemri
                        }
                    </p>

                    <p>
                        <b>Doctor ID:</b>
                        {" "}
                        {
                            item.doctor_id
                        }
                    </p>

                    <p>
                        <b>Specialization:</b>
                        {" "}
                        {
                            item.specializations?.emri
                        }
                    </p>

                    <p>
                        <b>Specialization ID:</b>
                        {" "}
                        {
                            item.specialization_id
                        }
                    </p>

                    <button
                        onClick={() =>
                            handleDelete(
                                item.id
                            )
                        }

                        style={{

                            color:
                                "white",

                            background:
                                "crimson",

                            border:
                                "none",

                            padding:
                                "10px 18px",

                            borderRadius:
                                "10px",

                            cursor:
                                "pointer",
                        }}
                    >
                        Delete
                    </button>

                </div>
            ))}

        </div>
    );
}