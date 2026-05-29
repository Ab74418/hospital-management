import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Doctors() {

    const [doctors, setDoctors] =
        useState([]);

    const [departments, setDepartments] =
        useState([]);

    const navigate = useNavigate();

    const [form, setForm] = useState({
        emri: "",
        mbiemri: "",
        department_id: "",
    });

    const fetchDoctors = () => {

        fetch(
            "http://localhost:5000/api/doctors"
        )
            .then((res) => res.json())
            .then((data) =>
                setDoctors(data)
            )
            .catch((err) =>
                console.log(err)
            );
    };

    const fetchDepartments = () => {

        fetch(
            "http://localhost:5000/api/departments"
        )
            .then((res) => res.json())
            .then((data) =>
                setDepartments(data)
            )
            .catch((err) =>
                console.log(err)
            );
    };

    useEffect(() => {

        fetchDoctors();

        fetchDepartments();

    }, []);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]:
                e.target.value,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const res = await fetch(
                "http://localhost:5000/api/doctors",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",
                    },

                    body: JSON.stringify(form),
                }
            );

            const result =
                await res.json();

            if (!res.ok) {

                alert(
                    result.message
                );

                return;
            }

            alert(
                "Doctor u shtua me sukses!"
            );

            setForm({
                emri: "",
                mbiemri: "",
                department_id: "",
            });

            fetchDoctors();

        } catch (err) {

            console.log(err);
        }
    };

    return (

        <div
            style={{
                padding: "20px",
            }}
        >

            <div
                style={{
                    display: "flex",
                    justifyContent:
                        "space-between",
                    alignItems:
                        "center",
                    marginBottom:
                        "20px",
                }}
            >

                <button
                    onClick={() =>
                        navigate(
                            "/patients"
                        )
                    }
                >
                    Back
                </button>

                <h1>Doctors</h1>

                <div></div>

            </div>

            <form
                onSubmit={
                    handleSubmit
                }
                style={{
                    display: "grid",
                    gap: "15px",
                    marginBottom:
                        "30px",
                }}
            >

                <input
                    type="text"
                    name="emri"
                    placeholder="Emri"
                    value={form.emri}
                    onChange={
                        handleChange
                    }
                    required
                />

                <input
                    type="text"
                    name="mbiemri"
                    placeholder="Mbiemri"
                    value={form.mbiemri}
                    onChange={
                        handleChange
                    }
                    required
                />

                <select
                    name="department_id"
                    value={
                        form.department_id
                    }
                    onChange={
                        handleChange
                    }
                    required
                >

                    <option value="">
                        Select Department
                    </option>

                    {departments.map(
                        (d) => (

                            <option
                                key={d.id}
                                value={d.id}
                            >
                                {d.emri}
                            </option>

                        )
                    )}

                </select>

                <button
                    type="submit"
                >
                    Add Doctor
                </button>

            </form>

            <div
                style={{
                    display: "grid",
                    gap: "15px",
                }}
            >

                {doctors.map(
                    (doctor) => (

                        <div
                            key={
                                doctor.id
                            }
                            style={{
                                border:
                                    "1px solid #ccc",
                                padding:
                                    "20px",
                                borderRadius:
                                    "10px",
                                background:
                                    "#fff",
                            }}
                        >

                            <h3>
                                {
                                    doctor.emri
                                }{" "}
                                {
                                    doctor.mbiemri
                                }
                            </h3>

                            <p>
                                <b>
                                    Department:
                                </b>{" "}
                                {
                                    doctor.department_id
                                }
                            </p>

                        </div>

                    )
                )}

            </div>

        </div>
    );
}

export default Doctors;