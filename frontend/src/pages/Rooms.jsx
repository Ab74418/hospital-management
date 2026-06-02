import { useEffect, useState } from "react";

export default function Rooms() {

    const [rooms, setRooms] = useState([]);

    useEffect(() => {

        fetch("http://localhost:5000/api/rooms")
            .then((res) => res.json())
            .then((data) => {

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