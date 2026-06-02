import { useEffect, useState } from "react";

export default function Appointments() {

    const [appointments, setAppointments] =
        useState([]);

    const [doctors, setDoctors] =
        useState([]);

    const [form, setForm] =
        useState({
            patient_id: "",
            doctor_id: "",
            data: "",
            ora: "",
            statusi: "",
            shenime: "",
        });

    const [editId, setEditId] =
        useState(null);

    const [selectedDoctor,
        setSelectedDoctor] =
        useState("");

    async function fetchAppointments() {

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
    }

    useEffect(() => {

        const loadData =
            async () => {

                await fetchAppointments();

                const doctorsRes =
                    await fetch(
                        "http://localhost:5000/api/doctors"
                    );

                const doctorsData =
                    await doctorsRes.json();

                setDoctors(
                    Array.isArray(
                        doctorsData
                    )
                        ? doctorsData
                        : []
                );
            };

        loadData();

    }, []);

    const handleChange =
        (e) => {

            setForm({
                ...form,
                [e.target.name]:
                    e.target.value,
            });
        };

    const handleEdit =
        (app) => {

            setEditId(app.id);

            setForm({
                patient_id:
                    app.patient_id,

                doctor_id:
                    app.doctor_id,

                data:
                    app.data?.slice(0, 10),

                ora:
                    app.ora?.slice(11, 16),

                statusi:
                    app.statusi,

                shenime:
                    app.shenime || "",
            });
        };

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            const overlap =
                appointments.find((a) =>

                    Number(a.doctor_id)
                    ===
                    Number(form.doctor_id)

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

            try {

                const res =
                    await fetch(url, {

                        method,

                        headers: {
                            "Content-Type":
                                "application/json",
                        },

                        body:
                            JSON.stringify(form),
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

    const filteredAppointments =

        selectedDoctor

            ?

            appointments.filter(
                (app) =>

                    Number(app.doctor_id)
                    ===
                    Number(selectedDoctor)
            )

            :

            appointments;

    return (

        <div
            style={{
                padding: "20px",
            }}
        >

            <h2>
                Appointments
            </h2>

            <form
                onSubmit={
                    handleSubmit
                }
            >

                <input
                    type="number"
                    name="patient_id"
                    placeholder="Patient ID"
                    value={
                        form.patient_id
                    }
                    onChange={
                        handleChange
                    }
                    required
                />

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
                                    doctor.id
                                }
                                {" - "}
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

            <hr />

            <h3>
                Schedule View për doktor
            </h3>

            <input
                type="number"
                placeholder="Shfaq terminet për Doctor ID"
                value={
                    selectedDoctor
                }
                onChange={(e) =>
                    setSelectedDoctor(
                        e.target.value
                    )
                }
            />

            <button
                onClick={() =>
                    setSelectedDoctor("")
                }

                style={{
                    marginLeft:
                        "10px",
                }}
            >
                Shfaq të gjitha
            </button>

            {
                filteredAppointments.map(
                    (app) => (

                        <div
                            key={app.id}

                            style={{
                                border:
                                    "1px solid #ccc",

                                padding:
                                    "10px",

                                marginTop:
                                    "10px",
                            }}
                        >

                            <p>
                                Pacienti:
                                {" "}
                                {
                                    app.patients?.emri
                                }
                                {" "}
                                {
                                    app.patients?.mbiemri
                                }
                            </p>

                            <p>
                                Doktori:
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
                                Data:
                                {" "}
                                {
                                    app.data?.slice(0, 10)
                                }
                            </p>

                            <p>
                                Ora:
                                {" "}
                                {
                                    app.ora?.slice(11, 16)
                                }
                            </p>

                            <p>
                                Statusi:
                                {" "}
                                {
                                    app.statusi
                                }
                            </p>

                            <p>
                                Shënime:
                                {" "}
                                {
                                    app.shenime
                                }
                            </p>

                            <button
                                onClick={() =>
                                    handleEdit(app)
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
                                }}
                            >
                                Delete
                            </button>

                        </div>
                    )
                )
            }

        </div>
    );
}