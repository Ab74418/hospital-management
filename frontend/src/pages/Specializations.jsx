import { useEffect, useState } from "react";

export default function Specializations() {
    const [specializations, setSpecializations] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/specializations")
            .then((res) => res.json())
            .then((data) => setSpecializations(data))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="page-container">
            <h1>Specializations</h1>

            <div className="cards">
                {specializations.map((s) => (
                    <div className="card" key={s.id}>
                        <h2>{s.emri}</h2>
                        <p>
                            <b>ID:</b> {s.id}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}