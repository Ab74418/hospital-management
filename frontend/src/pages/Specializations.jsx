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
        <div className="spec-page">
            <h1>Specializations</h1>

            <div className="spec-grid">
                {specializations.map((s) => (
                    <div className="spec-card" key={s.id}>
                        <div className="spec-icon">+</div>

                        <h2>{s.emri}</h2>

                        <p>
                            <b>ID:</b> {s.id}
                        </p>

                        <p>
                            <b>Lloji:</b> Specializim mjekësor
                        </p>

                        <div className="spec-buttons">
                            <button className="spec-edit">Edit</button>
                            <button className="spec-delete">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}