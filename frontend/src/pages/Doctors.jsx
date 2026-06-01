import { useEffect, useState } from "react";

export default function Doctors() {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/doctors")
            .then((res) => res.json())
            .then((data) => setDoctors(data))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div>
            <h1>Doctors</h1>

            {doctors.map((d) => (
                <div key={d.id}>
                    {d.emri} {d.mbiemri} - {d.specializimi}
                </div>
            ))}
        </div>
    );
}