import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Appointments() {

    const navigate = useNavigate();

    const [appointments, setAppointments] =
        useState([]);

    const [doctors, setDoctors] =
        useState([]);

    const [patients, setPatients] =
        useState([]);

    const [editId, setEditId] =
        useState(null);

    const [selectedDoctor,
        setSelectedDoctor] =
        useState("");

    const [form, setForm] =
        useState({

            patient_id: "",

            doctor_id: "",

            data: "",

            ora: "",

            statusi: "",

            shenime: "",
        });

    const fetchAppointments =
        async () => {

            try {

                const res =
                    await fetch(
                        "http://localhost:5000/api/appointments"
                    );

                const data =
                    await res.json();

                setAppointments(
                    Array.isArray(data)
                        ? data
                        : []
                );

            } catch (err) {

                console.log(err);
            }
        };

    const fetchDoctors =
        async () => {

            try {

                const res =
                    await fetch(
                        "http://localhost:5000/api/doctors"
                    );

                const data =
                    await res.json();

                setDoctors(
                    Array.isArray(data)
                        ? data
                        : []
                );

            } catch (err) {

                console.log(err);
            }
        };

    const fetchPatients =
        async () => {

            try {

                const res =
                    await fetch(
                        "http://localhost:5000/api/patients"
                    );

                const data =
                    await res.json();

                setPatients(
                    Array.isArray(data)
                        ? data
                        : []
                );

            } catch (err) {

                console.log(err);
            }
        };

    useEffect(() => {

        fetchAppointments();

        fetchDoctors();

        fetchPatients();

    }, []);

    const handleChange =
        (e) => {

            setForm({

                ...form,

                [e.target.name]:
                    e.target.value,
            });
        };

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            const overlap =
                appointments.find(
                    (a) =>

                        Number(
                            a.doctor_id
                        )
                        ===
                        Number(
                            form.doctor_id
                        )

                        &&

                        a.data?.slice(0, 10)
                        ===
                        form.data

                        &&

                        a.ora?.slice(11, 16)
                        ===
                        form.ora

                        &&

                        a.id !== editId
                );

            if (overlap) {

                alert(
                    "Ky doktor ka termin në këtë datë dhe orë!"
                );

                return;
            }

            try {

                const url =

                    editId

                        ?

                        `http://localhost:5000/api/appointments/${editId}`

                        :

                        "http://localhost:5000/api/appointments";

                const method =

                    editId
                        ? "PUT"
                        : "POST";

                const res =
                    await fetch(url, {

                        method,

                        headers: {
                            "Content-Type":
                                "application/json",
                        },

                        body:
                            JSON.stringify(
                                form
                            ),
                    });

                const result =
                    await res.json();

                if (!res.ok) {

                    alert(
                        result.message
                    );

                    return;
                }

                alert(

                    editId

                        ?

                        "Appointment updated!"

                        :

                        "Appointment added!"
                );

                setForm({

                    patient_id: "",

                    doctor_id: "",

                    data: "",

                    ora: "",

                    statusi: "",

                    shenime: "",
                });

                setEditId(null);

                fetchAppointments();

            } catch (err) {

                console.log(err);
            }
        };

    const handleDelete =
        async (id) => {

            const confirmDelete =
                window.confirm(
                    "A je e sigurt?"
                );

            if (!confirmDelete)
                return;

            try {

                await fetch(
                    `http://localhost:5000/api/appointments/${id}`,
                    {
                        method:
                            "DELETE",
                    }
                );

                fetchAppointments();

            } catch (err) {

                console.log(err);
            }
        };

    const handleEdit =
        (app) => {

            setEditId(app.id);

            setForm({

                patient_id:
                    app.patient_id || "",

                doctor_id:
                    app.doctor_id || "",

                data:
                    app.data?.slice(0, 10),

                ora:
                    app.ora?.slice(11, 16),

                statusi:
                    app.statusi || "",

                shenime:
                    app.shenime || "",
            });
        };

    const filteredAppointments =

        selectedDoctor

            ?

            appointments.filter(
                (app) =>

                    Number(
                        app.doctor_id
                    )
                    ===
                    Number(
                        selectedDoctor
                    )
            )

            :

            appointments;

    return (

        <div className="page-card">

            <button
                onClick={() =>
                    navigate("/home")
                }

                style={{

                    background:
                        "#1ea5e7",

                    color:
                        "white",

                    border:
                        "none",

                    padding:
                        "14px 24px",

                    borderRadius:
                        "14px",

                    fontSize:
                        "18px",

                    fontWeight:
                        "bold",

                    cursor:
                        "pointer",

                    marginBottom:
                        "20px",

                    boxShadow:
                        "0 2px 10px rgba(0,0,0,0.1)",
                }}
            >
                Back
            </button>

            <h1>
                Appointments
            </h1>

            <form
                className="patient-form"

                onSubmit={
                    handleSubmit
                }
            >

                <select
                    name="patient_id"

                    value={
                        form.patient_id
                    }

                    onChange={
                        handleChange
                    }

                    required
                >

                    <option value="">
                        Select Patient
                    </option>

                    {patients.map(
                        (p) => (

                            <option
                                key={p.id}
                                value={p.id}
                            >

                                {p.emri}
                                {" "}
                                {p.mbiemri}

                            </option>
                        )
                    )}

                </select>

                <select
                    name="doctor_id"

                    value={
                        form.doctor_id
                    }

                    onChange={
                        handleChange
                    }

                    required
                >

                    <option value="">
                        Select Doctor
                    </option>

                    {doctors.map(
                        (doctor) => (

                            <option
                                key={
                                    doctor.id
                                }

                                value={
                                    doctor.id
                                }
                            >

                                {
                                    doctor.emri
                                }

                                {" "}

                                {
                                    doctor.mbiemri
                                }

                            </option>
                        )
                    )}

                </select>

                <input
                    type="date"
                    name="data"
                    value={
                        form.data
                    }
                    onChange={
                        handleChange
                    }
                    required
                />

                <input
                    type="time"
                    name="ora"
                    value={
                        form.ora
                    }
                    onChange={
                        handleChange
                    }
                    required
                />

                <input
                    type="text"
                    name="statusi"
                    placeholder="Statusi"
                    value={
                        form.statusi
                    }
                    onChange={
                        handleChange
                    }
                    required
                />

                <input
                    type="text"
                    name="shenime"
                    placeholder="Shënime"
                    value={
                        form.shenime
                    }
                    onChange={
                        handleChange
                    }
                />

                <button
                    type="submit"
                >

                    {editId

                        ?

                        "Update Appointment"

                        :

                        "Add Appointment"}

                </button>

            </form>

            <h3
                style={{
                    marginTop:
                        "30px",
                }}
            >
                Schedule View për doktor
            </h3>

            <select
                value={
                    selectedDoctor
                }

                onChange={(e) =>
                    setSelectedDoctor(
                        e.target.value
                    )
                }
            >

                <option value="">
                    Shfaq të gjitha
                </option>

                {doctors.map(
                    (doctor) => (

                        <option
                            key={
                                doctor.id
                            }

                            value={
                                doctor.id
                            }
                        >

                            {
                                doctor.emri
                            }

                            {" "}

                            {
                                doctor.mbiemri
                            }

                        </option>
                    )
                )}

            </select>

            <div className="cards">

                {
                    filteredAppointments.map(
                        (app) => (

                            <div
                                className="card"
                                key={app.id}
                            >

                                <h2>

                                    {
                                        app.patients?.emri
                                    }

                                    {" "}

                                    {
                                        app.patients?.mbiemri
                                    }

                                </h2>

                                <p>

                                    <strong>
                                        Doktori:
                                    </strong>

                                    {" "}

                                    {
                                        app.doctors?.emri
                                    }

                                    {" "}

                                    {
                                        app.doctors?.mbiemri
                                    }

                                </p>

                                <p>

                                    <strong>
                                        Data:
                                    </strong>

                                    {" "}

                                    {
                                        app.data?.slice(0, 10)
                                    }

                                </p>

                                <p>

                                    <strong>
                                        Ora:
                                    </strong>

                                    {" "}

                                    {
                                        app.ora?.slice(11, 16)
                                    }

                                </p>

                                <p>

                                    <strong>
                                        Statusi:
                                    </strong>

                                    {" "}

                                    {
                                        app.statusi
                                    }

                                </p>

                                <p>

                                    <strong>
                                        Shënime:
                                    </strong>

                                    {" "}

                                    {
                                        app.shenime
                                    }

                                </p>

                                <button
                                    onClick={() =>
                                        handleEdit(
                                            app
                                        )
                                    }
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() =>
                                        handleDelete(
                                            app.id
                                        )
                                    }

                                    style={{
                                        marginLeft:
                                            "10px",

                                        background:
                                            "crimson",
                                    }}
                                >
                                    Delete
                                </button>

                            </div>
                        )
                    )
                }

            </div>

        </div>
    );
}