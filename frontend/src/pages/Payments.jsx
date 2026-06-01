import { useEffect, useState } from "react";

export default function Payments() {
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/payments")
            .then((res) => res.json())
            .then((data) => setPayments(data))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div>
            <h1>Payments</h1>

            {payments.map((p) => (
                <div key={p.id}>
                    {JSON.stringify(p)}
                </div>
            ))}
        </div>
    );
}