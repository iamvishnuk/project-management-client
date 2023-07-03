import React from "react";
import { BsFillMicMuteFill, BsFillMicFill } from "react-icons/bs";
import { FaVideoSlash, FaVideo } from "react-icons/fa";
import { MdCallEnd, MdOutlineScreenShare } from "react-icons/md";

export const Actions = ({ muteAndUnmute, mute, videoOnOff, video, startCapture, leave }) => {
    return (
        <div className="absolute w-full bottom-4 ">
            <div className="flex gap-3 justify-center">
                <div className="p-4 rounded-full bg-red-700" onClick={leave}>
                    <MdCallEnd color="white" size={20} />
                </div>
                <div
                    className="p-4 rounded-full bg-gray-700 hover:cursor-pointer"
                    onClick={muteAndUnmute}
                >
                    {mute ? (
                        <BsFillMicMuteFill color="white" size={20} />
                    ) : (
                        <BsFillMicFill color="white" size={20} />
                    )}
                </div>
                <div
                    className="p-4 rounded-full bg-gray-700"
                    onClick={videoOnOff}
                >
                    {video ? (
                        <FaVideoSlash color="white" size={20} />
                    ) : (
                        <FaVideo color="white" size={20} />
                    )}
                </div>
                <div
                    className="p-4 rounded-full bg-gray-700"
                    onClick={startCapture}
                >
                    <MdOutlineScreenShare color="white" size={20} />
                </div>
            </div>
        </div>
    );
};
