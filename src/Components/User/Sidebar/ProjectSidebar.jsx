import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProjectSidebar = () => {
    const navigate = useNavigate();
    const { projectName } = useSelector((state) => state.project.value);

    return (
        <>
            <div className="h-screen bg-gray-100 lg:w-72 md:w-20 border-r-2">
                <div className="flex justify-center items-center pt-3">
                    <h1 className="text-black font-medium text-xl lg:block md:hidden">
                        {projectName}
                    </h1>
                </div>
                <hr className="mt-5" />
                <ul className="pt-6 px-4 text-black font-medium">
                    <li
                        className="mt-2 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-blue-700 hover:text-white rounded-md lg:justify-start md:justify-center"
                        onClick={() =>
                            navigate(`/project-management/${projectName}/board`)
                        }
                    >
                        <div className="w-6 flex justify-center">
                            <i className="fa-solid fa-window-maximize text-xl"></i>
                        </div>
                        <span className="lg:block md:hidden">Board</span>
                    </li>
                    
                    <li
                        className="mt-2  text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-blue-700 hover:text-white rounded-md lg:justify-start md:justify-center"
                        onClick={() => {
                            navigate(
                                `/project-management/${projectName}/manage-access`
                            );
                        }}
                    >
                        <div className="w-6 flex justify-center">
                            <i className="fa-solid fa-people-group text-xl"></i>
                        </div>
                        <span className="lg:block md:hidden">
                            Manage Access
                        </span>
                    </li>
                    <li
                        className="mt-2  text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-blue-700 hover:text-white rounded-md lg:justify-start md:justify-center"
                        onClick={() => navigate("/project-management")}
                    >
                        <div className="w-6 flex justify-center">
                            <i className="fa-solid fa-arrow-left text-xl"></i>
                        </div>
                        <span className="lg:block md:hidden">Go back</span>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default ProjectSidebar;
