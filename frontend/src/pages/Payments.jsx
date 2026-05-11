import { useEffect, useState } from "react";

function Payments() {
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/payments")
            .then((res) => res.json())
            .then((data) => setPayments(data))
            .catch((err) => console.log(err));
    }, []);

    const totalPagesa = payments.reduce(
        (sum, p) => sum + Number(p.shuma || 0),
        0
    );

    return (
        <div>
            <h2>Payments</h2>
            <h3>Total Pagesa: {totalPagesa} €</h3>

            {payments.map((p) => (
                <p key={p.id}>
                    Invoice: {p.invoice_id} | Shuma: {p.shuma} € | Metoda: {p.metoda}
                </p>
            ))}
        </div>
    );
}

export default Payments;