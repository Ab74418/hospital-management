import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                "http://localhost:5000/api/auth/register",
                {
                    username,
                    password,
                }
            );

            alert("Registered successfully!");
            navigate("/login");

        } catch (err) {
            console.log(err);
            alert("Register failed!");
        }
    };

    return (
        <div>
            <h2>Register</h2>

            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">
                    Register
                </button>
            </form>
        </div>
    );
}

export default Register;