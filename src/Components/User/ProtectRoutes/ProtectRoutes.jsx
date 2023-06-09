import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { userAxiosInstance } from "../../../axios/AxiosInstance";

const ProtectRoutes = ({ route }) => {
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        const isUserAuth = async () => {
            try {
                await userAxiosInstance.get("/is-auth-user", {
                    withCredentials: true,
                }).then(res => {
                    console.log(res)
                    setAuth(res.data.auth)
                }).catch(err => {
                    setAuth(false)
                    localStorage.removeItem("userToken")
                })
            } catch (error) {
                console.log(error.response);
            }
        };
        isUserAuth();
    }, []);

    if (auth === null) return;

    return auth ? <Outlet /> : <Navigate to={route} />;
};
export default ProtectRoutes;
