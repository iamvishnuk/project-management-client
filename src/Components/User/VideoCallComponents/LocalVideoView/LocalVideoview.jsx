import React, { useEffect, useRef } from "react";

export const LocalVideoview = ({ localStream }) => {
    const localVideoRef = useRef();

    useEffect(() => {
        if (localStream) {
            const localVideo = localVideoRef.current;
            localVideo.srcObject = localStream;

            localVideo.onloademetadata = () => {
                localVideo.play();
            };
        }
    }, [localStream]);

    return (
        <div className="absolute right-5 top-5">
            <video className="w-60" src="" ref={localVideoRef} autoPlay muted />
        </div>
    );
};
