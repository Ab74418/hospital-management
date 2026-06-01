import { useEffect, useState } from "react";

export default function Schedules() {

    const [schedules, setSchedules] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/schedules")
            .then((res) => res.json())
            .then((data) => setSchedules(data))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div>
            <h1>Schedules</h1>

            {schedules.map((s) => (
                <div key={s.id}>
                    {JSON.stringify(s)}
                </div>
            ))}
        </div>
    );
}