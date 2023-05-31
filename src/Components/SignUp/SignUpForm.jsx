import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

function SignUpForm() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [number, setNumber] = useState("");
    const validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const registerUser = async (event) => {
        event.preventDefault();
        if (!username) {
            toast.error("Username is required");
        } else if (!email) {
            toast.error("Email is required");
        } else if (!password) {
            toast.error("Password is required");
        } else if (!email.match(validRegex)) {
            toast.error("Enter a valid email");
        } else {
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
                if (data) {
                    if (data.exist) {
                        toast.warn("Email is already used");
                    }
                    if (data.created) {
                        toast.success(
                            "Your account has been success fully created"
                        );
                    }
                }
            } catch (error) {
                console.error(error.message);
            }
        }
    };

    return (
        <>
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
                    <label htmlFor="">Phone Number</label>
                    <input
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        className="w-full border rounded-md bg-transparent border-gray-400 p-3"
                        type="text"
                        placeholder="Enter your phone number"
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
            <ToastContainer />
        </>
    );
}

export default SignUpForm;
