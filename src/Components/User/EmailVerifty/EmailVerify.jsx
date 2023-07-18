import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ErrorPage from "../../../Pages/ErrorPage";
import { emailVerification } from "../../../Services/userApi";

const EmailVerify = () => {
    const [validUrl, setValidUrl] = useState(true);
    const navigate = useNavigate();
    const params = useParams();
    console.log(params.id, params.token)
    useEffect(() => {
        console.log("useEffect called")
        emailVerification(params.id, params.token)
            .then((res) => {
                setValidUrl(true);
            })
            .catch((error) => {
                setValidUrl(false);
            });
    }, [params]);
    return (
        <>
            {validUrl && validUrl ? (
                <div className="flex justify-center items-center h-screen">
                    <div className=" text-center gap-8 grid">
                        <img
                            className="m-auto"
                            src="../../../Images/success.png"
                            alt=""
                        />
                        <h1 className="font-black text-xl">
                            Email Verified Successfully
                        </h1>
                        <button
                            onClick={() => navigate("/")}
                            className="border-1 border-gray-600 py-2 px-8 font-medium text-xl bg-[#01A601] text-white"
                        >
                            Go to Login page
                        </button>
                    </div>
                </div>
            ) : (
                <ErrorPage />
            )}
        </>
    );
};

export default EmailVerify;
