import React, { useState } from "react";
import { userAxiosInstance } from "../axios/AxiosInstance";
import { ToastContainer,toast } from "react-toastify";
import {CgSpinner} from 'react-icons/cg'

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false)

    const sendMail = async (e) => {
        try {
            e.preventDefault();
            setLoading(!loading)
            const { data } = await userAxiosInstance.get(
                `/forgot-password/${email}`,
                {
                    withCredentials: true,
                }
            );
            if(data) {
                toast.success(data.message)
                setLoading(false)
            }
        } catch(error) {
            if (error.response && error.response.status === 404) {
                toast.error(error.response.data.message)
            } else {
                console.log(error.message)
            }
        }
    };

    return (
        <>
            <div className="flex flex-col flex-auto w-full h-screen">
                <div className="h-full">
                    <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 h-full">
                        <div className="hidden lg:block bg-blue-900 max-h-screen">
                            <img
                                className="object-cover w-screen h-screen"
                                src="../../../../Images/forgot-password.jpg"
                                alt=""
                            />
                        </div>
                        <div className="flex justify-center items-center">
                            <div className="lg:px-8 w-4/6">
                                <h1 className="text-5xl font-extrabold font-sans my-5">
                                    Forgot password?
                                </h1>
                                <form action="" onSubmit={sendMail}>
                                    <div className="my-9">
                                        <label htmlFor="">
                                            Please enter your email to send
                                            verification mail
                                        </label>
                                        <input
                                            className="w-full border rounded-md bg-transparent border-gray-400 p-3 my-2"
                                            type="text"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className=" bg-blue-700 w-full h-11 border rounded-md text-white font-semibold flex justify-center items-center"
                                    >
                                        {loading && <CgSpinner size={20} className="animate-spin mt-1" />}
                                        Send Mail
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default ForgotPassword;