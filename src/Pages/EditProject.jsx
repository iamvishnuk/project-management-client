import Sidebar from "../Components/User/Sidebar/Sidebar";
import React from "react";
import EditProjectForm from "../Components/User/forms/EditProjectForm";

const EditProject = () => {
    return (
        <>
            <div className="flex">
                <Sidebar />
                <div className="p-10 h-screen overflow-auto flex-1">
                    <div className="mb-4">
                        <h1 className="text-2xl font-bold">Edit Project Details</h1>
                    </div>
                    <div>
                        <EditProjectForm />
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditProject;
