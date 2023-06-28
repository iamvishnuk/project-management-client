import React from "react";

export const ChatImageZoom = ({ imageUrl }) => {
    return (
        <div className="md:w-[750px] lg:w-[1000px] h-[600px]">
            <img className="object-contain w-full h-full" src={imageUrl} alt="" />
        </div>
    );
};
