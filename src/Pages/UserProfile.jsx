import React from "react";
import Sidebar from "../Components/User/Sidebar/Sidebar";

const UserProfile = () => {
    return (
        <>
            <div className="flex">
                <Sidebar />
                <div className="p-10 h-screen overflow-auto flex-1">
                    <div className="">
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserProfile;
