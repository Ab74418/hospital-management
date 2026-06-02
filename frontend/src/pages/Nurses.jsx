import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Nurses() {

    const navigate = useNavigate();

    const [nurses, setNurses] = useState([]);
    const [departments, setDepartments] = useState([]);

    const [form, setForm] = useState({
        emri: "",
        mbiemri: "",
        department_id: "",
        turni: "",
    });

    const [editingId, setEditingId] =
        useState(null);

    const loadData = async () => {

        try {

            const nursesRes = await fetch(
                "http://localhost:5000/api/nurses"
            );

            const nursesData =
                await nursesRes.json();

            setNurses(
                Array.isArray(nursesData)
                    ? nursesData
                    : []
            );

            const departmentsRes =
                await fetch(
                    "http://localhost:5000/api/departments"
                );

            const departmentsData =
                await departmentsRes.json();

            setDepartments(
                Array.isArray(
                    departmentsData
                )
                    ? departmentsData
                    : []
            );

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {

        loadData();

    }, []);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]:
                e.target.value,
        });
    };

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            try {

                let response;

                if (editingId) {

                    response = await fetch(
                        `http://localhost:5000/api/nurses/${editingId}`,
                        {
                            method: "PUT",

                            headers: {
                                "Content-Type":
                                    "application/json",
                            },

                            body:
                                JSON.stringify(
                                    form
                                ),
                        }
                    );

                } else {

                    response = await fetch(
                        "http://localhost:5000/api/nurses",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json",
                            },

                            body:
                                JSON.stringify(
                                    form
                                ),
                        }
                    );
                }

                if (!response.ok) {

                    throw new Error(
                        "Failed"
                    );
                }

                setForm({
                    emri: "",
                    mbiemri: "",
                    department_id:
                        "",
                    turni: "",
                });

                setEditingId(null);

                loadData();

            } catch (error) {

                console.log(error);
            }
        };

    const handleDelete =
        async (id) => {

            try {

                const response =
                    await fetch(
                        `http://localhost:5000/api/nurses/${id}`,
                        {
                            method:
                                "DELETE",
                        }
                    );

                if (!response.ok) {

                    throw new Error(
                        "Failed"
                    );
                }

                loadData();

            } catch (error) {

                console.log(error);
            }
        };

    const handleEdit =
        (nurse) => {

            setEditingId(
                nurse.id
            );

            setForm({
                emri:
                    nurse.emri || "",

                mbiemri:
                    nurse.mbiemri || "",

                department_id:
                    nurse.department_id ||
                    "",

                turni:
                    nurse.turni || "",
            });
        };

    return (

        <div
            style={{
                padding: "30px",
            }}
        >

            <button
                onClick={() =>
                    navigate("/home")
                }
                style={{
                    background:
                        "#1ea5e7",

                    color: "white",

                    border: "none",

                    padding:
                        "10px 20px",

                    borderRadius:
                        "10px",

                    cursor: "pointer",

                    marginBottom:
                        "20px",
                }}
            >
                Back
            </button>

            <h1>Nurses</h1>

            <form
                onSubmit={
                    handleSubmit
                }
                style={{
                    display: "flex",

                    flexDirection:
                        "column",

                    gap: "10px",

                    maxWidth:
                        "400px",

                    marginBottom:
                        "30px",
                }}
            >

                <input
                    type="text"
                    name="emri"
                    placeholder="Emri"
                    value={
                        form.emri
                    }
                    onChange={
                        handleChange
                    }
                />

                <input
                    type="text"
                    name="mbiemri"
                    placeholder="Mbiemri"
                    value={
                        form.mbiemri
                    }
                    onChange={
                        handleChange
                    }
                />

                <select
                    name="department_id"
                    value={
                        form.department_id
                    }
                    onChange={
                        handleChange
                    }
                >

                    <option value="">
                        Select Department
                    </option>

                    {departments.map(
                        (
                            department
                        ) => (

                            <option
                                key={
                                    department.id
                                }

                                value={
                                    department.id
                                }
                            >

                                {
                                    department.emri
                                }

                            </option>

                        )
                    )}

                </select>

                <input
                    type="text"
                    name="turni"
                    placeholder="Turni"
                    value={
                        form.turni
                    }
                    onChange={
                        handleChange
                    }
                />

                <button
                    type="submit"
                >

                    {editingId
                        ? "Update Nurse"
                        : "Add Nurse"}

                </button>

            </form>

            {nurses.length ===
                0 ? (

                <p>
                    No nurses found
                </p>

            ) : (

                nurses.map(
                    (nurse) => (

                        <div
                            key={
                                nurse.id
                            }
                            style={{
                                background:
                                    "white",

                                padding:
                                    "15px",

                                marginBottom:
                                    "10px",

                                borderRadius:
                                    "10px",
                            }}
                        >

                            <h3>

                                {
                                    nurse.emri
                                }{" "}

                                {
                                    nurse.mbiemri
                                }

                            </h3>

                            <p>

                                Department:
                                {" "}

                                {
                                    nurse.department_name
                                }

                            </p>

                            <p>

                                Turni:
                                {" "}

                                {
                                    nurse.turni
                                }

                            </p>

                            <button
                                onClick={() =>
                                    handleEdit(
                                        nurse
                                    )
                                }
                            >
                                Edit
                            </button>

                            <button
                                onClick={() =>
                                    handleDelete(
                                        nurse.id
                                    )
                                }
                            >
                                Delete
                            </button>

                        </div>

                    )
                )

            )}

        </div>
    );
}