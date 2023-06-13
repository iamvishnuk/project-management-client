import React from "react";
import { Outlet } from "react-router-dom";
import ProjectSidebar from "../Components/User/Sidebar/ProjectSidebar";

const ProjectManagementLayout = () => {
    return (
        <>
            <div className="flex">
                <ProjectSidebar />
                <div className="h-screen overflow-auto flex-1 p-10">
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default ProjectManagementLayout;
