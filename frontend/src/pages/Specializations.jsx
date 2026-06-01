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
        <div>
            <h1>Specializations</h1>

            {specializations.map((s) => (
                <div key={s.id}>
                    {JSON.stringify(s)}
                </div>
            ))}
        </div>
    );
}