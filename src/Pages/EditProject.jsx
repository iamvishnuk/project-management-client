import React from "react";
import EditProjectForm from "../Components/User/forms/EditProjectForm";

const EditProject = () => {
    return (
        <>
            <div className="mb-4">
                <h1 className="text-2xl font-bold">Edit Project Details</h1>
            </div>
            <div>
                <EditProjectForm />
            </div>
        </>
    );
};

export default EditProject;
