import { useState } from "react";
import { RiVideoAddFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

export default function CreateMeeting() {
    const navigate = useNavigate();
    const [roomId, setRoomId] = useState("");

    const joinMeeting = () => {
        if (roomId.trim() === "" || roomId.startsWith(" ")) {
            toast.error("Enter a valid roomId");
        } else {
            navigate(`/meeting/${roomId}`);
        }
    };

    const newMeeting = () => {
        const newRoomId = uuidv4();
        navigate(`/meeting/${newRoomId}`);
    };

    return (
        <>
            <div className="grid lg:grid-cols-2 h-full">
                <div className="h-full flex justify-center items-center">
                    <div className="flex gap-1">
                        <button
                            className="flex items-center gap-2 font-medium bg-blue-600 text-white h-10 px-3 rounded-md hover:bg-blue-700"
                            onClick={newMeeting}
                        >
                            <RiVideoAddFill size={20} />
                            New meeting
                        </button>
                        <div className="relative mb-6">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <i className="fa-solid fa-keyboard"></i>
                            </div>
                            <input
                                type="text"
                                id="input-group-1"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Enter the room id"
                                value={roomId}
                                onChange={(e) => setRoomId(e.target.value)}
                            />
                        </div>
                        {roomId !== "" && (
                            <button
                                className="flex items-center gap-2 font-medium bg-blue-600 text-white h-10 px-3 rounded-md hover:bg-blue-700"
                                onClick={joinMeeting}
                            >
                                join
                            </button>
                        )}
                    </div>
                </div>
                <div className=" h-full flex justify-center items-center ">
                    <div>
                        <img
                            className="w-[300px]"
                            src="/Images/create-meeting.svg"
                            alt=""
                        />
                        <div className="mt-4">
                            <p className="text-center text-xs font-medium">
                                Click New meeting to get like you can send to
                                people <br /> you want to meet with
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
