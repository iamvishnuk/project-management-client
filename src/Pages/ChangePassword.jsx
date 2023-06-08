import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { forgotPassword } from "../yup";
import ErrorPage from "./ErrorPage";
import { useParams } from "react-router-dom";
import { userAxiosInstance } from "../axios/AxiosInstance";

const initialValues = {
    newPassword: "",
    confirmPassword: "",
};

const ChangePassword = () => {
    const [validUrl, setValidUrl] = useState(false);
    const params = useParams();
    useEffect(() => {
        const verifyUrl = async () => {
            try {
                const url = `/change-password/${params.id}/verify/${params.token}`;
                const { data } = await userAxiosInstance.get(url, {
                    withCredentials: true,
                });
                console.log(data);
                if (data.auth) {
                    setValidUrl(true);
                } else {
                    setValidUrl(false);
                }
            } catch (error) {
                console.log(error.message);
                setValidUrl(false);
            }
        };
        verifyUrl();
    }, [params]);

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues: initialValues,
            validationSchema: forgotPassword,
            onSubmit: () => {
                ChangePassword();
            },
        });

    const ChangePassword = async () => {
        try {
            const { data } = await userAxiosInstance.post(
                `/change-password/${params.id}`,
                values,
                { withCredentials: true }
            );
            if (data.updated) {
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
        }
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
                                                type="text"
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
                                                type="text"
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
