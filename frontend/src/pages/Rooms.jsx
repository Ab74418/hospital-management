import { useEffect, useState } from "react";

export default function Rooms() {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/rooms")
            .then(res => res.json())
            .then(data => setRooms(data));
    }, []);

    const freeRooms = rooms.filter(
        r => r.statusi === "free"
    ).length;

    const occupiedRooms = rooms.filter(
        r => r.statusi === "occupied"
    ).length;

    return (
        <div>
            <h2>Rooms</h2>
            <h3>Free Rooms: {freeRooms}</h3>

            <h3>Occupied Rooms: {occupiedRooms}</h3>
            {rooms.map(r => (
                <div key={r.id}>
                    {r.numri_dhomes} - {r.lloji} - {r.statusi}
                </div>
            ))}
        </div>
    );
}