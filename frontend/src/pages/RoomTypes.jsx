import { useEffect, useState } from "react";

import {
    useNavigate
} from "react-router-dom";

export default function RoomTypes() {

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

    const [roomtypes,
        setRoomTypes] =
        useState([]);

    const [editId,
        setEditId] =
        useState(null);

    const [form,
        setForm] =
        useState({

            emri: "",

            cmimi: ""
        });

    const fetchRoomTypes =
        () => {

            fetch(
                "http://localhost:5000/api/roomtypes"
            )
                .then((res) =>
                    res.json()
                )

                .then((data) =>
                    setRoomTypes(data)
                )

                .catch((err) =>
                    console.log(err));
        };

    useEffect(() => {

        fetchRoomTypes();

    }, []);

    const handleChange =
        (e) => {

            setForm({

                ...form,

                [e.target.name]:
                    e.target.value
            });
        };

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            try {

                const url =

                    editId

                        ?

                        `http://localhost:5000/api/roomtypes/${editId}`

                        :

                        "http://localhost:5000/api/roomtypes";

                const method =

                    editId
                        ? "PUT"
                        : "POST";

                const res =
                    await fetch(url, {

                        method,

                        headers: {

                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(
                                form
                            )
                    });

                if (!res.ok) {

                    throw new Error(
                        "Gabim gjatë ruajtjes"
                    );
                }

                alert(

                    editId

                        ?

                        "Room Type updated!"

                        :

                        "Room Type added!"
                );

                fetchRoomTypes();

                setEditId(null);

                setForm({

                    emri: "",

                    cmimi: ""
                });

            } catch (err) {

                console.log(err);

                alert(
                    "Error saving room type"
                );
            }
        };

    const handleEdit =
        (room) => {

            setEditId(room.id);

            setForm({

                emri:
                    room.emri || "",

                cmimi:
                    room.cmimi || ""
            });
        };

    const handleDelete =
        async (id) => {

            const confirmDelete =
                window.confirm(
                    "A dëshiron ta fshish këtë room type?"
                );

            if (!confirmDelete)
                return;

            try {

                await fetch(
                    `http://localhost:5000/api/roomtypes/${id}`,
                    {
                        method:
                            "DELETE"
                    }
                );

                alert(
                    "Room Type deleted!"
                );

                fetchRoomTypes();

            } catch (err) {

                console.log(err);
            }
        };

    return (

        <div className="page-card">

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

                    boxShadow:
                        "0 2px 10px rgba(0,0,0,0.1)",
                }}
            >
                Back
            </button>

            <h1>
                Room Types
            </h1>

            <p>
                Manage hospital room categories
            </p>

            <form
                className="patient-form"

                onSubmit={
                    handleSubmit
                }
            >

                <input
                    type="text"

                    name="emri"

                    placeholder="Room Type"

                    value={form.emri}

                    onChange={
                        handleChange
                    }

                    required
                />

                <input
                    type="number"

                    name="cmimi"

                    placeholder="Price"

                    value={form.cmimi}

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

                        "Update Room Type"

                        :

                        "Add Room Type"}

                </button>

            </form>

            <div
                className="page-card"

                style={{
                    marginTop:
                        "30px",
                }}
            >

                <table>

                    <thead>

                        <tr>

                            <th>ID</th>

                            <th>
                                Room Type
                            </th>

                            <th>
                                Price
                            </th>

                            <th>
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {roomtypes.map(
                            (room) => (

                                <tr
                                    key={room.id}
                                >

                                    <td>
                                        {room.id}
                                    </td>

                                    <td>
                                        {room.emri}
                                    </td>

                                    <td>
                                        {room.cmimi} €
                                    </td>

                                    <td>

                                        <button
                                            type="button"

                                            onClick={() =>
                                                handleEdit(
                                                    room
                                                )
                                            }
                                        >
                                            Edit
                                        </button>

                                        <button
                                            type="button"

                                            onClick={() =>
                                                handleDelete(
                                                    room.id
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

                                    </td>

                                </tr>
                            )
                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
}