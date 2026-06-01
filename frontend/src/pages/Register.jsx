import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {

    const [form, setForm] = useState({
        username: "",
        password: "",
        role: "user",
        secretCode: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await axios.post(
                "http://localhost:5000/api/auth/register",
                form
            );

            alert("Registered successfully!");

            navigate("/login");

        } catch (err) {

            console.log(err);

            alert(
                err.response?.data?.message ||
                "Register failed!"
            );
        }
    };

    return (

        <div>

            <h2>Register</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                />

                <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                >

                    <option value="user">
                        User
                    </option>

                    <option value="doctor">
                        Doctor
                    </option>

                    <option value="admin">
                        Admin
                    </option>

                    <option value="nurse">
                        Nurse
                    </option>

                    <option value="receptionist">
                        Receptionist
                    </option>



                </select>

                <input
                    type="text"
                    name="secretCode"
                    placeholder="Secret Code"
                    value={form.secretCode}
                    onChange={handleChange}
                />

                <button type="submit">
                    Register
                </button>

            </form>

        </div>
    );
}

export default Register;