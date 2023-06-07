import React from "react";

const ForgotPassword = () => {
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
                                <form action="">
                                    <div className="my-9">
                                        <label htmlFor="">
                                            Please enter your email to send
                                            verification otp
                                        </label>
                                        <input
                                            className="w-full border rounded-md bg-transparent border-gray-400 p-3 my-2"
                                            type="text"
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className=" bg-blue-700 w-full h-11 border rounded-md text-white font-semibold"
                                    >
                                        Send Otp
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ForgotPassword;
