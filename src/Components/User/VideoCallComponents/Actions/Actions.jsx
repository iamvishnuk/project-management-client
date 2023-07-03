import React from "react";
import { BsFillMicMuteFill, BsFillMicFill } from "react-icons/bs";
import { FaVideoSlash, FaVideo } from "react-icons/fa";
import { MdCallEnd, MdOutlineScreenShare } from "react-icons/md";

export const Actions = ({
    toggleMic,
    micActive,
    toggleCamera,
    cameraActive,
    startCapture,
    leave,
}) => {
    return (
        <div className="absolute w-full bottom-4 ">
            <div className="flex gap-3 justify-center">
                <div className="p-4 rounded-full bg-red-700" onClick={leave}>
                    <MdCallEnd color="white" size={20} />
                </div>
                <div
                    className="p-4 rounded-full bg-gray-700 hover:cursor-pointer"
                    onClick={toggleMic}
                >
                    {micActive ? (
                        <BsFillMicFill color="white" size={20} />
                    ) : (
                        <BsFillMicMuteFill color="white" size={20} />
                    )}
                </div>
                <div
                    className="p-4 rounded-full bg-gray-700"
                    onClick={toggleCamera}
                >
                    {cameraActive ? (
                        <FaVideo color="white" size={20} />
                    ) : (
                        <FaVideoSlash color="white" size={20} />
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
