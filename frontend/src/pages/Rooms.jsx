import { useEffect, useState } from "react";

export default function Rooms() {

    const [rooms, setRooms] = useState([]);

    useEffect(() => {

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

                const validRooms = data.filter(
                    (room) =>
                        room.numri_dhomes &&
                        room.lloji &&
                        room.statusi
                );

                setRooms(validRooms);

            })
            .catch((err) => console.log(err));

    }, []);

    const freeRooms =
        rooms.filter((room) => room.statusi === "free").length;

    const occupiedRooms =
        rooms.filter((room) => room.statusi === "occupied").length;

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

            <div className="page-card">

                <table>

                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Room Number</th>
                            <th>Type</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>

                        {rooms.map((room) => (

                            <tr key={room.id}>
                                <td>{room.id}</td>
                                <td>{room.numri_dhomes}</td>
                                <td>{room.lloji}</td>
                                <td>{room.statusi}</td>
                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );
}