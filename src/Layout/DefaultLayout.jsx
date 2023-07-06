import React, { useEffect } from "react";
import Sidebar from "../Components/User/Sidebar/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useSocketConnection from "../hooks/Socket";
import { NotificaitonIcon } from "../constant/constant";


const DefaultLayout = () => {
    const socket = useSocketConnection();
    const { userId } = useSelector((state) => state.user);
    const navigate = useNavigate()

    useEffect(() => {
        const verifyToken = () => {
            const token = localStorage.getItem("userToken");
            if (!token) {
                navigate("/");
            }
        };
        verifyToken();
    }, [navigate]);

    // FOR DISPLAYING THE BROWSER NOTIFICATON
    useEffect(() => {
        if (socket) {
            socket.on("notification", () => {
                new Notification("New Notification", {
                    body: "You have a new NotificaitonIcon from ProjectFlow",
                    icon: NotificaitonIcon,
                });
            });
        }
    }, [socket]);

    // FOR SETTING THE ACTIVE USER FOR SENDING THE NOTIFICATION
    useEffect(() => {
        if (socket) {
            socket.emit("active:user", userId);
        }
    }, [socket]);

    // FOR REQUESTING THE PERMISSION FOR NOTIFICATION
    useEffect(() => {
        Notification.requestPermission()
            .then(() => {})
            .catch((error) => {});
    }, []);

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
