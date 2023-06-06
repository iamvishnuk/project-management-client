import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectRoutes = ({ route }) => {
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        setAuth(true);
    });

    if (auth === null) return;

    return auth ? <Outlet /> : <Navigate to={route} />;
};
export default ProtectRoutes;
