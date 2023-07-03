import React from "react";
import { useEffect } from "react";
import { useRef } from "react";

export const ScreenShareView = ({ screen }) => {
    const localScreenRef = useRef();

    useEffect(() => {
        if (screen) {
            const localScreen = localScreenRef.current;
            localScreen.srcObject = screen;

            localScreen.onloadmetadata = () => {
                localScreen.play();
            };
        }
        console.log(screen)
    }, [screen]);

    return (
        <div className="absolute">
            <video
                className="w-[75%]"
                src=""
                ref={localScreenRef}
                autoPlay
                muted
            ></video>
        </div>
    );
};
