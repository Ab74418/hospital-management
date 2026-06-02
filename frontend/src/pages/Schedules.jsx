import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Schedules() {

    const navigate = useNavigate();

    const [schedules, setSchedules] =
        useState([]);

    const [doctors, setDoctors] =
        useState([]);

    const [doctorId, setDoctorId] =
        useState("");

    const [dita, setDita] =
        useState("");

    const [oraFillimit, setOraFillimit] =
        useState("");

    const [oraMbarimit, setOraMbarimit] =
        useState("");

    const [editingId, setEditingId] =
        useState(null);

    useEffect(() => {

        getSchedules();
        getDoctors();

    }, []);

    const getSchedules = async () => {

        try {

            const response =
                await axios.get(
                    "http://localhost:5000/api/schedules"
                );

            setSchedules(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    const getDoctors = async () => {

        try {

            const response =
                await axios.get(
                    "http://localhost:5000/api/doctors"
                );

            setDoctors(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    const resetForm = () => {

        setDoctorId("");
        setDita("");
        setOraFillimit("");
        setOraMbarimit("");
        setEditingId(null);
    };

    const handleSubmit = async () => {

        try {

            const data = {

                doctor_id:
                    Number(doctorId),

                dita,

                ora_fillimit:
                    oraFillimit,

                ora_mbarimit:
                    oraMbarimit,
            };

            if (editingId) {

                await axios.put(

                    `http://localhost:5000/api/schedules/${editingId}`,

                    data
                );

            } else {

                await axios.post(

                    "http://localhost:5000/api/schedules",

                    data
                );
            }

            getSchedules();

            resetForm();

        } catch (error) {

            console.log(error);
        }
    };

    const handleDelete = async (id) => {

        try {

            await axios.delete(

                `http://localhost:5000/api/schedules/${id}`
            );

            getSchedules();

        } catch (error) {

            console.log(error);
        }
    };

    const handleEdit = (schedule) => {

        setEditingId(schedule.id);

        setDoctorId(schedule.doctor_id);

        setDita(schedule.dita);

        setOraFillimit(
            schedule.ora_fillimit
                ?.slice(0, 5)
        );

        setOraMbarimit(
            schedule.ora_mbarimit
                ?.slice(0, 5)
        );
    };

    return (

        <div className="page-container">

            <button

                className="back-btn"

                onClick={() =>
                    navigate("/home")
                }
            >

                Back

            </button>

            <h1>Schedules</h1>

            <div className="form-container">

                <select

                    value={doctorId}

                    onChange={(e) =>
                        setDoctorId(
                            e.target.value
                        )
                    }
                >

                    <option value="">
                        Select Doctor
                    </option>

                    {doctors.map((doctor) => (

                        <option

                            key={doctor.id}

                            value={doctor.id}
                        >

                            {doctor.emri}{" "}
                            {doctor.mbiemri}

                        </option>
                    ))}

                </select>

                <input

                    type="text"

                    placeholder="Day"

                    value={dita}

                    onChange={(e) =>
                        setDita(
                            e.target.value
                        )
                    }
                />

                <input

                    type="time"

                    value={oraFillimit}

                    onChange={(e) =>
                        setOraFillimit(
                            e.target.value
                        )
                    }
                />

                <input

                    type="time"

                    value={oraMbarimit}

                    onChange={(e) =>
                        setOraMbarimit(
                            e.target.value
                        )
                    }
                />

                <button

                    className="add-btn"

                    onClick={handleSubmit}
                >

                    {editingId
                        ? "Update Schedule"
                        : "Add Schedule"}

                </button>

            </div>

            <div className="table-container">

                <table>

                    <thead>

                        <tr>

                            <th>ID</th>
                            <th>Doctor</th>
                            <th>Day</th>
                            <th>Start</th>
                            <th>End</th>
                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {schedules.map((schedule) => (

                            <tr key={schedule.id}>

                                <td>
                                    {schedule.id}
                                </td>

                                <td>

                                    {schedule.doctors?.emri}{" "}
                                    {schedule.doctors?.mbiemri}

                                </td>

                                <td>
                                    {schedule.dita}
                                </td>

                                <td>
                                    {schedule.ora_fillimit}
                                </td>

                                <td>
                                    {schedule.ora_mbarimit}
                                </td>

                                <td>

                                    <button

                                        className="edit-btn"

                                        onClick={() =>
                                            handleEdit(schedule)
                                        }
                                    >

                                        Edit

                                    </button>

                                    <button

                                        className="delete-btn"

                                        onClick={() =>
                                            handleDelete(schedule.id)
                                        }
                                    >

                                        Delete

                                    </button>

                                </td>

                            </tr>
                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}