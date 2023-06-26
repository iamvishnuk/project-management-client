import React, { useState, useRef, useEffect } from "react";
import io from "socket.io-client";
const baseURL = import.meta.env.VITE_REACT_APP_BASE_URL;
import { addMessage, getAllMessage } from "../../../Services/userApi";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export const TeamDiscussion = () => {
    const socket = useRef();
    const scroll = useRef();
    const [value, setValue] = useState("");
    const { userId } = useSelector((state) => state.user);
    const params = useParams();
    const teamId = params.id;
    const [message, setMessage] = useState([]);

    // for handing the message submit
    const handleSumbit = (e) => {
        e.preventDefault();
        addMessage({ message: value, teamId: teamId })
            .then((res) => {
                socket.current.emit("send-message", res.data.data);
            })
            .catch((err) => console.log("addMessage", err.message));
        setValue("");
    };

    // getting the previous msg on the component mount
    const getMsg = () => {
        getAllMessage(teamId)
            .then((res) => {
                setMessage(res.data.message);
            })
            .catch((err) => console.log("getMsg", err.message));
    };

    // listening of the -- recieved-msg -- event and update the state
    socket.current &&
        socket.current.on("receved-msg", (newMessage) => {
            setMessage([...message, newMessage]);
        });

    // for scolling the message div automatically when a new message come
    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, [message]);

    useEffect(() => {
        getMsg();
        socket.current = io(baseURL);
        socket.current.emit("join-room", teamId);
        return () => {
            // Clean up scoket connection on component unmount
            if (socket.current) {
                socket.current.disconnect();
            }
        };
    }, []);

    return (
        <>
            <div className=" w-full h-full border-2 rounded-md shadow p-2">
                <div className="h-[90%] border-b-2 overflow-auto">
                    <div>
                        <div className="flex flex-col h-full overflow-x-auto mb-4">
                            <div ref={scroll} className="flex flex-col h-full">
                                <div className="grid grid-cols-12 gap-y-2">
                                    {message.map((data, index) => {
                                        return (
                                            <React.Fragment key={index}>
                                                {data.from?._id === userId ? (
                                                    <div className="col-start-6 col-end-13 p-3 rounded-lg">
                                                        <div className="flex items-center justify-start flex-row-reverse">
                                                            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                                                {
                                                                    data.from
                                                                        ?.userName[0]
                                                                }
                                                            </div>
                                                            <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                                                                <div>
                                                                    {
                                                                        data.message
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="col-start-1 col-end-8 p-3 rounded-lg">
                                                        <div className="flex flex-row items-center">
                                                            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                                                {
                                                                    data.from
                                                                        ?.userName[0]
                                                                }
                                                            </div>
                                                            <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                                                <div>
                                                                    {
                                                                        data.message
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </React.Fragment>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-1 mt-2">
                    <div className="w-full">
                        <form onSubmit={handleSumbit}>
                            <label htmlFor="chat" className="sr-only">
                                Your message
                            </label>
                            <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                                <button
                                    type="button"
                                    className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                                >
                                    <svg
                                        aria-hidden="true"
                                        className="w-6 h-6"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                    <span className="sr-only">
                                        Upload image
                                    </span>
                                </button>
                                {/* <button
                                    type="button"
                                    className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                                >
                                    <svg
                                        aria-hidden="true"
                                        className="w-6 h-6"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                    <span className="sr-only">Add emoji</span>
                                </button> */}
                                <textarea
                                    id="chat"
                                    rows="1"
                                    className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Your message..."
                                    name="message"
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                ></textarea>
                                <button
                                    type="submit"
                                    className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
                                >
                                    <svg
                                        aria-hidden="true"
                                        className="w-6 h-6 rotate-90"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                                    </svg>
                                    <span className="sr-only">
                                        Send message
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
