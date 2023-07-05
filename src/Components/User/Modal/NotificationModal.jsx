import React from "react";
import { useEffect } from "react";
import { getAllNotification } from "../../../Services/userApi";
import { useState } from "react";
import dateFormat from "dateformat";
import useSocketConnection from "../../../hooks/Socket";
import { toast } from "react-toastify";

export const NotificationModal = ({ isVisible, onClose }) => {
    if (!isVisible) return null;
    const [notification, setnotification] = useState([]);
    const socket = useSocketConnection();

    const handleClose = (e) => {
        if (e.target.id === "wrapper") onClose();
    };

    useEffect(() => {
        console.log("notification useEffect called")
        if (socket) {
            socket.on("notification", () => {
                console.log("notification")
                toast.success("new Notification");
            });
        }
    },[socket])

    useEffect(() => {
        getAllNotification()
            .then((res) => {
                console.log(res.data.notifications);
                setnotification(res.data.notifications);
            })
            .catch((error) => console.log(error.message));
    }, []);

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-20 flex items-center z-10"
            onClick={handleClose}
            id="wrapper"
        >
            <div className="flex flex-col ml-72 bg-white p-1 rounded-md lg:w-4/12 h-screen">
                <div className="flex justify-between items-center border-b-2 px-2">
                    <h1 className="font-medium">Notification</h1>
                    <button
                        className="text-black text-2xl"
                        onClick={() => onClose()}
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <div className="bg-white p-2 overflow-auto max-h-screen">
                    <div className="">
                        <ul>
                            {notification.map((notifi) => (
                                <li
                                    key={notifi._id}
                                    className="border p-2 my-1 shadow-lg"
                                >
                                    <p className="font-medium flex justify-between">
                                        {notifi.title}
                                        <span>
                                            {dateFormat(
                                                notifi.date,
                                                "d / mmmm / yyyy"
                                            )}
                                        </span>
                                    </p>
                                    <hr />
                                    <p className="font-Popins text-sm py-2">
                                        {notifi.message}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
