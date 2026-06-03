import { useEffect, useState } from "react";

import {
    useNavigate
} from "react-router-dom";

export default function Rooms() {

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

    const [rooms,
        setRooms] =
        useState([]);

    const [departments,
        setDepartments] =
        useState([]);

    const [roomtypes,
        setRoomtypes] =
        useState([]);

    const [editingId,
        setEditingId] =
        useState(null);

    const [formData,
        setFormData] =
        useState({

            numri_dhomes: "",

            department_id: "",

            roomtype_id: "",

            statusi: "",

            kapaciteti: ""
        });

    const fetchRooms =
        () => {

            fetch(
                "http://localhost:5000/api/rooms"
            )
                .then((res) =>
                    res.json()
                )

                .then((data) =>
                    setRooms(data)
                )

                .catch((err) =>
                    console.log(err)
                );
        };

    const fetchDepartments =
        () => {

            fetch(
                "http://localhost:5000/api/departments"
            )
                .then((res) =>
                    res.json()
                )

                .then((data) =>
                    setDepartments(data)
                )

                .catch((err) =>
                    console.log(err)
                );
        };

    const fetchRoomtypes =
        () => {

            fetch(
                "http://localhost:5000/api/roomtypes"
            )
                .then((res) =>
                    res.json()
                )

                .then((data) =>
                    setRoomtypes(data)
                )

                .catch((err) =>
                    console.log(err)
                );
        };

    useEffect(() => {

        fetchRooms();

        fetchDepartments();

        fetchRoomtypes();

    }, []);

    const handleChange =
        (e) => {

            setFormData({

                ...formData,

                [e.target.name]:
                    e.target.value
            });
        };

    const handleEdit =
        (room) => {

            setEditingId(room.id);

            setFormData({

                numri_dhomes:
                    room.numri_dhomes || "",

                department_id:
                    room.department_id || "",

                roomtype_id:
                    room.roomtype_id || "",

                statusi:
                    room.statusi || "",

                kapaciteti:
                    room.kapaciteti || ""
            });
        };

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            try {

                const url =

                    editingId

                        ?

                        `http://localhost:5000/api/rooms/${editingId}`

                        :

                        "http://localhost:5000/api/rooms";

                const method =
                    editingId
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
                                formData
                            )
                    });

                if (!res.ok) {

                    throw new Error(
                        "Gabim gjatë ruajtjes"
                    );
                }

                alert(

                    editingId

                        ?

                        "Room updated!"

                        :

                        "Room added!"
                );

                fetchRooms();

                setEditingId(null);

                setFormData({

                    numri_dhomes: "",

                    department_id: "",

                    roomtype_id: "",

                    statusi: "",

                    kapaciteti: ""
                });

            } catch (err) {

                console.log(err);

                alert(
                    "Error saving room"
                );
            }
        };

    const handleDelete =
        async (id) => {

            const confirmDelete =
                window.confirm(
                    "A dëshiron ta fshish këtë dhomë?"
                );

            if (!confirmDelete)
                return;

            try {

                await fetch(
                    `http://localhost:5000/api/rooms/${id}`,
                    {
                        method:
                            "DELETE"
                    }
                );

                alert(
                    "Room deleted!"
                );

                fetchRooms();

            } catch (err) {

                console.log(err);
            }
        };

    const freeRooms =

        rooms.filter(
            (room) =>
                room.statusi ===
                "E lire"
        ).length;

    const occupiedRooms =

        rooms.filter(
            (room) =>
                room.statusi ===
                "E zene"
        ).length;

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
                Rooms Management
            </h1>

            <div className="cards">

                <div className="card">

                    <h2>
                        Free Rooms
                    </h2>

                    <p
                        style={{
                            fontSize:
                                "40px",

                            fontWeight:
                                "bold",
                        }}
                    >
                        {freeRooms}
                    </p>

                </div>

                <div className="card">

                    <h2>
                        Occupied Rooms
                    </h2>

                    <p
                        style={{
                            fontSize:
                                "40px",

                            fontWeight:
                                "bold",
                        }}
                    >
                        {occupiedRooms}
                    </p>

                </div>

            </div>

            <form
                className="patient-form"

                onSubmit={
                    handleSubmit
                }
            >

                <input
                    type="text"

                    name="numri_dhomes"

                    placeholder="Room Number"

                    value={
                        formData.numri_dhomes
                    }

                    onChange={
                        handleChange
                    }

                    required
                />

                <select
                    name="department_id"

                    value={
                        formData.department_id
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
                        (dep) => (

                            <option
                                key={dep.id}

                                value={dep.id}
                            >

                                {dep.emri}

                            </option>
                        )
                    )}

                </select>

                <select
                    name="roomtype_id"

                    value={
                        formData.roomtype_id
                    }

                    onChange={
                        handleChange
                    }

                    required
                >

                    <option value="">
                        Select Room Type
                    </option>

                    {roomtypes.map(
                        (type) => (

                            <option
                                key={type.id}

                                value={type.id}
                            >

                                {type.emri}

                            </option>
                        )
                    )}

                </select>

                <select
                    name="statusi"

                    value={
                        formData.statusi
                    }

                    onChange={
                        handleChange
                    }

                    required
                >

                    <option value="">
                        Select Status
                    </option>

                    <option value="E lire">
                        E lire
                    </option>

                    <option value="E zene">
                        E zene
                    </option>

                    <option value="Ne pastrim">
                        Ne pastrim
                    </option>

                </select>

                <input
                    type="number"

                    name="kapaciteti"

                    placeholder="Capacity"

                    value={
                        formData.kapaciteti
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

                        "Update Room"

                        :

                        "Add Room"}

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
                                Room Number
                            </th>

                            <th>
                                Department
                            </th>

                            <th>
                                Room Type
                            </th>

                            <th>
                                Price
                            </th>

                            <th>
                                Status
                            </th>

                            <th>
                                Capacity
                            </th>

                            <th>
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {rooms.map(
                            (room) => (

                                <tr
                                    key={room.id}
                                >

                                    <td>
                                        {room.id}
                                    </td>

                                    <td>
                                        {
                                            room.numri_dhomes
                                        }
                                    </td>

                                    <td>
                                        {
                                            room.departments?.emri
                                        }
                                    </td>

                                    <td>
                                        {
                                            room.roomtypes?.emri
                                        }
                                    </td>

                                    <td>

                                        {
                                            room.roomtypes?.cmimi
                                        }

                                        €

                                    </td>

                                    <td>
                                        {
                                            room.statusi
                                        }
                                    </td>

                                    <td>
                                        {
                                            room.kapaciteti
                                        }
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