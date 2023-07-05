import  { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import ManageProjectTable from "../Components/User/Table/ManageProjectTable";
import { useNavigate } from "react-router";
import { getAllProjectDetail } from "../Services/userApi";

const ProjectManagement = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [projectDetails, setProjectDetails] = useState([])

    const getData = () => {
        getAllProjectDetail().then((res) => {
            setProjectDetails(res.data.projectDetails);
        });
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <div className="">
                <h1 className="text-2xl font-bold">Project Mangement</h1>
                <div className="mt-3 mb-3 flex justify-between">
                    <input
                        className="rounded-md h-10 w-2/6 border-2 border-gray-500"
                        type="text"
                        placeholder="Search....."
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button
                        onClick={() => navigate("/create-project")}
                        className="bg-btn-green text-white font-medium px-3 py-1 rounded-md flex items-center"
                    >
                        <FaPlus className="mr-1" />
                        Create project
                    </button>
                </div>
            </div>
            <ManageProjectTable projectDetails={projectDetails} getData={getData} search={search} />
        </>
    );
};

export default ProjectManagement;
