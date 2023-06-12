import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthUser } from "../../../Services/userApi";
import { toast } from "react-toastify";

const ProtectRoutes = ({ route }) => {
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        const isUserAuth = async () => {
            isAuthUser()
                .then((res) => {
                    console.log(res);
                    setAuth(res.data.auth);
                })
                .catch((err) => {
                    setAuth(false);
                    localStorage.removeItem("userToken");
                });
        };
        isUserAuth();
    }, []);

    if (auth === null) return;

    return auth ? <Outlet /> : <Navigate to={route} />;
};
export default ProtectRoutes;
