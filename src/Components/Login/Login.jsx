import React from "react";

function Login() {
    return (
        <>
            <div className="flex flex-col flex-auto w-full h-screen">
                <div className="h-full">
                    <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 h-full">
                        <div className="hidden lg:block bg-blue-900 max-h-screen">
                            <img
                                className="object-cover w-screen h-screen"
                                src="../../../../Images/login-signup.png"
                                alt=""
                            />
                        </div>
                        <div className="flex justify-center items-center">
                            <div className="lg:px-8 w-4/6">
                                <h1 className="text-5xl font-extrabold font-sans my-5">
                                    Log in
                                </h1>
                                <p>
                                    Login to your account so you can start
                                    building your project
                                </p>
                                <form action="">
                                    <div className="my-5">
                                        <label htmlFor="">Email</label>
                                        <input
                                            className="w-full border rounded-md bg-transparent border-gray-400 p-3"
                                            type="text"
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                    <div className="mt-5 mb-3">
                                        <label htmlFor="">Password</label>
                                        <input
                                            className="w-full border rounded-md bg-transparent border-gray-400 p-3"
                                            type="password"
                                            placeholder="Enter your password"
                                        />
                                    </div>
                                    <div className="text-right mb-3">
                                        <label
                                            htmlFor=""
                                            className="text-blue-800 font-semibold"
                                        >
                                            Forgot password?
                                        </label>
                                    </div>
                                    <button
                                        type="submit"
                                        className=" bg-blue-700 w-full h-11 border rounded-md text-white font-semibold"
                                    >
                                        Login
                                    </button>
                                </form>
                                <label className="my-3" htmlFor="">
                                    Don't have a account yet?
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
