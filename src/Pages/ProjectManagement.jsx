import React from "react";
import Sidebar from "../Components/User/Sidebar/Sidebar";
import { FaPlus } from "react-icons/fa";
import ManageProjectTable from "../Components/User/Table/ManageProjectTable";
import { useNavigate } from "react-router";

const ProjectManagement = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="flex">
                <Sidebar />
                <div className="p-10 h-screen overflow-auto flex-1">
                    <div className="">
                        <h1 className="text-2xl font-bold">
                            Project Mangement
                        </h1>
                        <div className="mt-3 mb-3 flex justify-end">
                            <button
                                onClick={() => navigate("/create-project")}
                                className="bg-btn-green text-white font-medium px-3 py-1 rounded-md flex items-center"
                            >
                                <FaPlus className="mr-1" />
                                Create project
                            </button>
                        </div>
                    </div>
                    <ManageProjectTable />
                </div>
            </div>
        </>
    );
};

export default ProjectManagement;
