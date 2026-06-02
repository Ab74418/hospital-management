import { useEffect, useState } from "react";

export default function RoomTypes() {
    const [roomtypes, setRoomTypes] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/roomtypes")
            .then((res) => res.json())
            .then((data) => {
                setRoomTypes(data);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="main-content">
            <h1>Room Types</h1>
            <p>Manage hospital room categories</p>

            <div className="page-card">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Room Type</th>
                            <th>Price</th>
                        </tr>
                    </thead>

                    <tbody>
                        {roomtypes.map((room) => (
                            <tr key={room.id}>
                                <td>{room.id}</td>
                                <td>{room.emri}</td>
                                <td>{room.cmimi} €</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}