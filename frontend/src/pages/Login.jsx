
import { useState } from "react";
import axios from "axios";

import {
    Link,
    useNavigate,
} from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [username, setUsername] =
        useState("");

    const [password, setPassword] =
        useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const res = await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    username,
                    password,
                }
            );

            console.log(res.data);

            localStorage.setItem(
                "token",
                res.data.token
            );

            localStorage.setItem(
                "role",
                res.data.role
            );

            if (res.data.role === "admin") {

                navigate("/home");
            }

            else if (res.data.role === "doctor") {

                navigate("/doctor");
            }

            else if (res.data.role === "receptionist") {

                navigate("/receptionist");
            }

            else {

                navigate("/user");
            }

        } catch (err) {

            console.log(err);

            alert(
                err.response?.data?.message ||
                "Login failed!"
            );
        }
    };

    return (

        <div className="auth-wrapper">

            <div className="auth-form">

                <h2>Login</h2>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) =>
                            setUsername(
                                e.target.value
                            )
                        }
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(
                                e.target.value
                            )
                        }
                        required
                    />

                    <button type="submit">
                        Login
                    </button>

                </form>

                <p>

                    Don't have an account?{" "}

                    <Link to="/register">
                        Register
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default Login
