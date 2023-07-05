import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { forgotPasswordSchema } from "../yup";
import ErrorPage from "./ErrorPage";
import { useParams } from "react-router-dom";
import { verifyChangePasswordUrl, forgotPassword } from "../Services/userApi";

const initialValues = {
    newPassword: "",
    confirmPassword: "",
};

const ChangePassword = () => {
    const [validUrl, setValidUrl] = useState(false);
    const params = useParams();
    useEffect(() => {
        verifyChangePasswordUrl(params.id, params.token)
            .then((res) => {
                setValidUrl(true);
            })
            .catch((error) => {
                setValidUrl(false);
            });
    }, [params]);

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues: initialValues,
            validationSchema: forgotPasswordSchema,
            onSubmit: () => {
                changePassword();
            },
        });

    const changePassword = async () => {
        forgotPassword(params.id, values)
            .then((response) => {
                toast.success(response.data.message)
            })
            .catch((error) => {
                if (error.response && error.response.status === 304) {
                    toast.error(
                        "New password and the old password are the same"
                    );
                } else {
                    const message = error.response
                        ? error.response.data.message
                        : "Network error";
                    toast.error(message);
                }
            });
    };

    return (
        <>
            {validUrl ? (
                <div className="flex flex-col flex-auto w-full h-screen">
                    <div className="h-full">
                        <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 h-full">
                            <div className="hidden lg:block bg-white-900 max-h-screen">
                                <img
                                    className="object-cover w-screen h-screen"
                                    src="../../../../Images/change-password.png"
                                    alt=""
                                />
                            </div>
                            <div className="flex justify-center items-center">
                                <div className="lg:px-8 w-4/6">
                                    <h1 className="text-5xl font-extrabold font-sans my-5">
                                        Change Password
                                    </h1>
                                    <form action="" onSubmit={handleSubmit}>
                                        <div className="mt-9">
                                            {errors.newPassword &&
                                            touched.newPassword ? (
                                                <label className="text-red-500">
                                                    {errors.newPassword}
                                                </label>
                                            ) : (
                                                <label htmlFor="">
                                                    Enter new password
                                                </label>
                                            )}
                                            <input
                                                className="w-full border rounded-md bg-transparent border-gray-400 p-3 my-2"
                                                type="password"
                                                placeholder="Enter your email"
                                                name="newPassword"
                                                value={values.newPassword}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            {errors.confirmPassword &&
                                            touched.confirmPassword ? (
                                                <label className="text-red-500">
                                                    {errors.confirmPassword}
                                                </label>
                                            ) : (
                                                <label htmlFor="">
                                                    Confirm password
                                                </label>
                                            )}
                                            <input
                                                className="w-full border rounded-md bg-transparent border-gray-400 p-3 my-2"
                                                type="password"
                                                placeholder="Enter your email"
                                                name="confirmPassword"
                                                value={values.confirmPassword}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className=" bg-blue-700 w-full h-11 border rounded-md text-white font-semibold flex justify-center items-center"
                                        >
                                            Change password
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <ErrorPage />
            )}
            <ToastContainer />
        </>
    );
};

export default ChangePassword;
