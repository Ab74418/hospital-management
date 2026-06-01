import { useEffect, useState } from "react";

export default function RoomTypes() {
    const [roomtypes, setRoomTypes] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/roomtypes")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setRoomTypes(data);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div>
            <h1>Room Types</h1>

            {roomtypes.map((room) => (
                <div key={room.id}>
                    {room.emri} - {room.cmimi}
                </div>
            ))}
        </div>
    );
}