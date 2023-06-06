import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { userAxiosInstance } from "../../../axios/AxiosInstance";

const EmailVerify = () => {
    const [validUrl, setValidUrl] = useState(false);
    const navigate = useNavigate();
    const params = useParams();
    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const url = `/user/${params.id}/verify/${params.token}`;
                const { data } = userAxiosInstance.get(url, { withCredentials: true });
                console.log(data);
                setValidUrl(true);
            } catch (error) {
                console.log(error);
                setValidUrl(false);
            }
        };
        verifyEmail();
    }, [params]);
    return (
        <>
            {validUrl ? (
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
                            onClick={() => navigate("/login")}
                            className="border-1 border-gray-600 py-2 px-8 font-medium text-xl bg-[#01A601] text-white"
                        >
                            Go to Login page
                        </button>
                    </div>
                </div>
            ) : (
                <h1 className="text-2xl font-black">404 Error</h1>
            )}
        </>
    );
};

export default EmailVerify;
