import { useEffect, useState } from "react";

export default function Appointments() {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/appointments")
            .then((res) => res.json())
            .then((data) => setAppointments(data))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <h2>Appointments</h2>

            {appointments.map((app) => (
                <div key={app.id} style={{ border: "1px solid #ccc", padding: "12px", marginBottom: "10px" }}>
                    <p><b>Pacienti:</b> {app.patients?.emri} {app.patients?.mbiemri}</p>
                    <p><b>Doktori:</b> {app.doctors?.emri} {app.doctors?.mbiemri}</p>
                    <p><b>Data:</b> {app.data?.slice(0, 10)}</p>
                    <p><b>Ora:</b> {app.ora?.slice(11, 16)}</p>
                    <p><b>Statusi:</b> {app.statusi}</p>
                    <p><b>Shënime:</b> {app.shenime}</p>
                </div>
            ))}
        </div>
    );
}