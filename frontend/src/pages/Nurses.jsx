import { useEffect, useState } from "react";

export default function Nurses() {
    const [nurses, setNurses] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/nurses")
            .then((res) => res.json())
            .then((data) => setNurses(data))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div>
            <h1>Nurses</h1>

            {nurses.map((nurse) => (
                <div key={nurse.id}>
                    {nurse.emri} {nurse.mbiemri}
                </div>
            ))}
        </div>
    );
}