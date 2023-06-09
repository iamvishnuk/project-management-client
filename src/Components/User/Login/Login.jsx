import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import { userLogin, loginWithGoogle } from "../../../Services/userApi";
import { useDispatch } from "react-redux";
import { changeUserDetails } from "../../../Redux/UserSlice";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailRequried, setEmailRequired] = useState(false);
    const [passwordRequried, setPasswordRequired] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const login = async (e) => {
        e.preventDefault();
        if (email === "") {
            setEmailRequired(true);
        } else if (password === "") {
            setPasswordRequired(true);
        } else {
            userLogin({ email: email, password: password })
                .then((res) => {
                    localStorage.setItem("userToken", res.data.token);
                    dispatch(
                        changeUserDetails({
                            userId: res.data.userId,
                            userName: res.data.userName,
                        })
                    );
                    toast.success(res.data.message);
                    navigate("/project-management");
                })
                .catch((error) => {
                    toast.error(error.response.data.message);
                });
        }
    };

    // google sigin function
    const responseMessage = async (response) => {
        const userDetails = jwtDecode(response.credential);
        loginWithGoogle(userDetails)
            .then((res) => {
                localStorage.setItem("userToken", res.data.token);
                dispatch(
                    changeUserDetails({
                        userId: res.data.userId,
                        userName: res.data.userName,
                    })
                );
                toast.success(res.data.message);
                navigate("/project-management");
            })
            .catch((error) => {
                toast.error(error.response.data.message);
            });
    };

    // google error
    const errorMessage = (error) => {};

    return (
        <>
            <div className="flex flex-col flex-auto w-full h-screen">
                <div className="h-full">
                    <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 h-full">
                        <div className="hidden lg:block max-h-screen ">
                            <div className="w-full">
                                <div className="flex flex-col justify-center items-center pt-10">
                                    <h1 className="bg-gradient-to-r from-blue-700 to-red-600 bg-clip-text text-transparent text-5xl font-extrabold mb-2">
                                        ProjectFlow
                                    </h1>
                                    <p className="text-sm text-center text-black font-medium font-Popins">
                                        Welcome to our Project Management Tool!
                                        Our platform provides a comprehensive
                                        solution for managing <br /> and
                                        organizing your projects efficiently.
                                        With our user-friendly interface and
                                        powerful features, <br /> you can
                                        streamline your project workflows,
                                        collaborate with team members <br /> and
                                        stay on top of deadlines.
                                    </p>
                                </div>
                            </div>
                            <div className="max-h-full">
                                <img
                                    className="object-contain max-h-full"
                                    src="../../../../Images/login-signup-2.png"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className="flex justify-center items-center">
                            <div className="lg:px-8 w-4/6">
                                <h1 className="text-5xl font-bold my-5 font-Popins">
                                    Log In
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
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                        />
                                        {emailRequried ? (
                                            <label className="text-red-500">
                                                Email is required
                                            </label>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="mt-5 mb-3">
                                        <label htmlFor="">Password</label>
                                        <input
                                            className="w-full border rounded-md bg-transparent border-gray-400 p-3"
                                            type="password"
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                        />
                                        {passwordRequried ? (
                                            <label>Password is required</label>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="text-right mb-3">
                                        <label
                                            htmlFor=""
                                            className="text-blue-800 font-semibold"
                                        >
                                            <Link to={"/forgot-password"}>
                                                Forgot password?
                                            </Link>
                                        </label>
                                    </div>
                                    <button
                                        type="submit"
                                        className=" bg-blue-700 w-full h-11 border rounded-md text-white font-semibold"
                                        onClick={login}
                                    >
                                        Login
                                    </button>
                                </form>
                                <label className="my-3" htmlFor="">
                                    Dont have a account yet{" "}
                                    <Link
                                        className="text-blue-600 font-semibold"
                                        to={"/signup"}
                                    >
                                        SignUp
                                    </Link>
                                </label>
                                <div className="flex justify-center mt-3">
                                    <GoogleLogin
                                        onSuccess={responseMessage}
                                        onError={errorMessage}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default Login;
