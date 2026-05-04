import { useEffect, useState } from "react";

export default function Rooms() {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/rooms")
            .then(res => res.json())
            .then(data => setRooms(data));
    }, []);

    return (
        <div>
            <h2>Rooms</h2>
            {rooms.map(r => (
                <div key={r.id}>
                    {r.room_number} - {r.type} - {r.status}
                </div>
            ))}
        </div>
    );
}