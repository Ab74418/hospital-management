import { useEffect, useState } from "react";

export default function Rooms() {

    const [rooms, setRooms] = useState([]);

    const [departments, setDepartments] =
        useState([]);

    const [roomtypes, setRoomtypes] =
        useState([]);

    const [editingId, setEditingId] =
        useState(null);

    const [formData, setFormData] =
        useState({

            numri_dhomes: "",
            department_id: "",
            roomtype_id: "",
            statusi: "",
            kapaciteti: "",

        });

    const fetchRooms = () => {

        fetch("http://localhost:5000/api/rooms")

            .then((res) => res.json())

            .then((data) => {
<<<<<<< HEAD
                const validRooms = data.filter(
                    (room) => room.numri_dhomes && room.lloji && room.statusi
                );
                setRooms(validRooms);
            })
            .catch((err) => console.log(err));
    }, []);

    const freeRooms = rooms.filter((room) => room.statusi === "free").length;
    const occupiedRooms = rooms.filter((room) => room.statusi === "occupied").length;

    return (
        <div className="page-container">
            <h1>Rooms</h1>

            <div className="stats">
                <div className="stat-card">
                    <div className="stat-title">Free Rooms</div>
                    <div className="stat-number">{freeRooms}</div>
                </div>

                <div className="stat-card">
                    <div className="stat-title">Occupied Rooms</div>
                    <div className="stat-number">{occupiedRooms}</div>
                </div>
=======

                setRooms(data);

            })

            .catch((err) => console.log(err));

    };

    const fetchDepartments = () => {

        fetch("http://localhost:5000/api/departments")

            .then((res) => res.json())

            .then((data) => {

                setDepartments(data);

            })

            .catch((err) => console.log(err));

    };

    const fetchRoomtypes = () => {

        fetch("http://localhost:5000/api/roomtypes")

            .then((res) => res.json())

            .then((data) => {

                setRoomtypes(data);

            })

            .catch((err) => console.log(err));

    };

    useEffect(() => {

        fetchRooms();
        fetchDepartments();
        fetchRoomtypes();

    }, []);

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
                e.target.value,

        });

    };

    const handleEdit = (room) => {

        setEditingId(room.id);

        setFormData({

            numri_dhomes:
                room.numri_dhomes,

            department_id:
                room.department_id,

            roomtype_id:
                room.roomtype_id,

            statusi:
                room.statusi,

            kapaciteti:
                room.kapaciteti,

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (editingId) {

                await fetch(
                    `http://localhost:5000/api/rooms/${editingId}`,
                    {

                        method: "PUT",

                        headers: {
                            "Content-Type":
                                "application/json",
                        },

                        body: JSON.stringify(formData),

                    }
                );

            } else {

                await fetch(
                    "http://localhost:5000/api/rooms",
                    {

                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",
                        },

                        body: JSON.stringify(formData),

                    }
                );

            }

            fetchRooms();

            setEditingId(null);

            setFormData({

                numri_dhomes: "",
                department_id: "",
                roomtype_id: "",
                statusi: "",
                kapaciteti: "",

            });

        } catch (error) {

            console.log(error);

        }

    };

    const handleDelete = async (id) => {

        const confirmDelete =
            window.confirm(
                "A dëshironi ta fshini këtë dhomë?"
            );

        if (!confirmDelete) return;

        try {

            await fetch(
                `http://localhost:5000/api/rooms/${id}`,
                {
                    method: "DELETE",
                }
            );

            fetchRooms();

        } catch (error) {

            console.log(error);

        }

    };

    const freeRooms =
        rooms.filter(
            (room) =>
                room.statusi === "E lire"
        ).length;

    const occupiedRooms =
        rooms.filter(
            (room) =>
                room.statusi === "E zene"
        ).length;

    return (

        <div className="page-container">

            <h1>Rooms Management</h1>

            <div className="stats">

                <div className="stat-card">

                    <h2>Free Rooms</h2>

                    <p>{freeRooms}</p>

                </div>

                <div className="stat-card">

                    <h2>Occupied Rooms</h2>

                    <p>{occupiedRooms}</p>

                </div>

>>>>>>> ce331e9cee3ee489b68a6fb3d24dd58f3f2cec0b
            </div>

            <form
                className="room-form"
                onSubmit={handleSubmit}
            >

                <input
                    type="text"
                    name="numri_dhomes"
                    placeholder="Room Number"
                    value={formData.numri_dhomes}
                    onChange={handleChange}
                    required
                />

                <select
                    name="department_id"
                    value={formData.department_id}
                    onChange={handleChange}
                    required
                >

                    <option value="">
                        Select Department
                    </option>

                    {departments.map((dep) => (

                        <option
                            key={dep.id}
                            value={dep.id}
                        >
                            {dep.emri}
                        </option>

                    ))}

                </select>

                <select
                    name="roomtype_id"
                    value={formData.roomtype_id}
                    onChange={handleChange}
                    required
                >

                    <option value="">
                        Select Room Type
                    </option>

                    {roomtypes.map((type) => (

                        <option
                            key={type.id}
                            value={type.id}
                        >
                            {type.emri}
                        </option>

                    ))}

                </select>

                <select
                    name="statusi"
                    value={formData.statusi}
                    onChange={handleChange}
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
                    value={formData.kapaciteti}
                    onChange={handleChange}
                    required
                />

                <button type="submit">

                    {editingId
                        ? "Update Room"
                        : "Add Room"}

                </button>

            </form>

            <div className="page-card">

                <table>

                    <thead>

                        <tr>

                            <th>ID</th>

                            <th>Room Number</th>

                            <th>Department</th>

                            <th>Room Type</th>

                            <th>Price</th>

                            <th>Status</th>

                            <th>Capacity</th>

                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {rooms.map((room) => (

                            <tr key={room.id}>

                                <td>{room.id}</td>

                                <td>
                                    {room.numri_dhomes}
                                </td>

                                <td>
                                    {room.departments?.emri}
                                </td>

                                <td>
                                    {room.roomtypes?.emri}
                                </td>

                                <td>
                                    {room.roomtypes?.cmimi} €
                                </td>

                                <td>
                                    {room.statusi}
                                </td>

                                <td>
                                    {room.kapaciteti}
                                </td>

                                <td>

                                    <button
                                        className="edit-btn"
                                        onClick={() =>
                                            handleEdit(room)
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="delete-btn"
                                        onClick={() =>
                                            handleDelete(room.id)
                                        }
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}