import axios from "axios";
import React, { useState } from "react";

function SignUpForm() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const registerUser = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios.post(
                "http://localhost:4000",
                {
                    username,
                    email,
                    password,
                },
                { withCredentials: true }
            );
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <form action="" onSubmit={registerUser}>
            <div className="my-5">
                <label htmlFor="">User Name</label>
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full border rounded-md bg-transparent border-gray-400 p-3"
                    type="text"
                    placeholder="Enter your user name"
                />
            </div>
            <div className="my-5">
                <label htmlFor="">Email</label>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border rounded-md bg-transparent border-gray-400 p-3"
                    type="text"
                    placeholder="Enter your email"
                />
            </div>
            <div className="my-5">
                <label htmlFor="">Password</label>
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border rounded-md bg-transparent border-gray-400 p-3"
                    type="password"
                    placeholder="Enter your password"
                />
            </div>
            <button
                type="submit"
                className=" bg-blue-700 w-full h-11 border rounded-md text-white font-semibold"
            >
                Register
            </button>
        </form>
    );
}

export default SignUpForm;
