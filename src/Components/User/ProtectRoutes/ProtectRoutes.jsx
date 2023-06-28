import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { isAuthUser } from "../../../Services/userApi";

const ProtectRoutes = ({ route }) => {
    const [auth, setAuth] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const isUserAuth = async () => {
            isAuthUser()
                .then((res) => {
                    console.log('protected',res)
                    setAuth(res.data.auth);
                })
                .catch((err) => {
                    setAuth(false);
                    localStorage.removeItem("userToken");
                    navigate("/");
                });
        };
        isUserAuth();
    }, []);

    if (auth === null) return;

    return auth ? <Outlet /> : <Navigate to={route} />;
};
export default ProtectRoutes;
