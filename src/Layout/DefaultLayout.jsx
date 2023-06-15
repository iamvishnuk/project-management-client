import React from "react";
import Sidebar from "../Components/User/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
    return (
        <>
            <div className="flex">
                <Sidebar />
                <div className="h-screen overflow-auto flex-1 p-10">
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default DefaultLayout;
