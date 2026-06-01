import { useEffect, useState } from "react";

export default function Departments() {
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/departments")
            .then((res) => res.json())
            .then((data) => setDepartments(data))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div>
            <h1>Departments</h1>

            {departments.map((d) => (
                <div key={d.id}>
                    {d.emertimi} - {d.pershkrimi}
                </div>
            ))}
        </div>
    );
}