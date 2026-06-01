import { useEffect, useState } from "react";

export default function Nurses() {

    const [nurses, setNurses] = useState([]);

    const [form, setForm] = useState({
        emri: "",
        mbiemri: "",
        department_id: "",
        turni: "",
    });

    const [editingId, setEditingId] =
        useState(null);

    const fetchNurses = async () => {

        try {

            const res = await fetch(
                "http://localhost:5000/api/nurses"
            );

            const data = await res.json();

            if (Array.isArray(data)) {

                setNurses(data);

            } else {

                setNurses([]);
            }

        } catch (err) {

            console.log(err);
        }
    };

    useEffect(() => {

        const fetchNurses = async () => {

            try {

                const res = await fetch(
                    "http://localhost:5000/api/nurses"
                );

                const data =
                    await res.json();

                if (Array.isArray(data)) {

                    setNurses(data);

                } else {

                    setNurses([]);
                }

            } catch (err) {

                console.log(err);
            }
        };

        fetchNurses();

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

            if (editingId) {

                await fetch(
                    `http://localhost:5000/api/nurses/${editingId}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type":
                                "application/json",
                        },
                        body: JSON.stringify(form),
                    }
                );

            } else {

                await fetch(
                    "http://localhost:5000/api/nurses",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type":
                                "application/json",
                        },
                        body: JSON.stringify(form),
                    }
                );
            }

            setForm({
                emri: "",
                mbiemri: "",
                department_id: "",
                turni: "",
            });

            setEditingId(null);

            fetchNurses();

        } catch (err) {

            console.log(err);
        }
    };

    const handleDelete = async (id) => {

        try {

            await fetch(
                `http://localhost:5000/api/nurses/${id}`,
                {
                    method: "DELETE",
                }
            );

            fetchNurses();

        } catch (err) {

            console.log(err);
        }
    };

    const handleEdit = (nurse) => {

        setEditingId(nurse.id);

        setForm({
            emri: nurse.emri,
            mbiemri: nurse.mbiemri,
            department_id:
                nurse.department_id,
            turni: nurse.turni,
        });
    };

    return (

        <div
            style={{
                padding: "30px",
            }}
        >

            <h1>Nurses</h1>

            <form
                onSubmit={handleSubmit}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    maxWidth: "400px",
                    marginBottom: "30px",
                }}
            >

                <input
                    type="text"
                    name="emri"
                    placeholder="Emri"
                    value={form.emri}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="mbiemri"
                    placeholder="Mbiemri"
                    value={form.mbiemri}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="department_id"
                    placeholder="Department ID"
                    value={form.department_id}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="turni"
                    placeholder="Turni"
                    value={form.turni}
                    onChange={handleChange}
                />

                <button type="submit">

                    {editingId
                        ? "Update Nurse"
                        : "Add Nurse"}

                </button>

            </form>

            {nurses.length === 0 ? (

                <p>No nurses found</p>

            ) : (

                nurses.map((nurse) => (

                    <div
                        key={nurse.id}
                        style={{
                            background: "white",
                            padding: "15px",
                            marginBottom: "10px",
                            borderRadius: "10px",
                        }}
                    >

                        <h3>
                            {nurse.emri}{" "}
                            {nurse.mbiemri}
                        </h3>

                        <p>
                            Department ID:
                            {" "}
                            {nurse.department_id}
                        </p>

                        <p>
                            Turni:
                            {" "}
                            {nurse.turni}
                        </p>

                        <button
                            onClick={() =>
                                handleEdit(nurse)
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

                ))

            )}

        </div>
    );
}