import { useEffect, useState } from "react";
import {
    getMembersAndCategory,
    createProject,
} from "../../../Services/userApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useSocketConnection from "../../../hooks/Socket";

const CreateProjectFrom = () => {
    const soket = useSocketConnection()
    const [category, setCategory] = useState([]);
    const [members, setMembers] = useState([]);
    const navigate = useNavigate()

    const [projectDetails, setProjectDetails] = useState({
        projectName: "",
        projectCategory: "",
        projectUrl: "",
        projectLead: "",
        description: "",
    });

    //for getting the member and category detail for the create project
    const getData = async () => {
        getMembersAndCategory()
            .then((res) => {
                setCategory(res.data.categoryDetails);
                setMembers(res.data.memberDetails);
            })
    };

    //for creating new project
    const create = (e) => {
        e.preventDefault();
        createProject(projectDetails)
            .then((res) => {
                toast.success(res.data.message)
                navigate("/project-management");
                if(soket) {
                    soket.emit("create:project",res.data.projectLead)
                }
            })
            .catch((error) => {
                toast.error(error.response.data.message)
            });
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <div>
                <form>
                    <div className="mb-6">
                        <label
                            htmlFor="projectName"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Project Name
                        </label>
                        <input
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Enter your project name"
                            name="projectName"
                            onChange={(e) =>
                                setProjectDetails({
                                    ...projectDetails,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="projectCategory"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Project Category
                        </label>
                        <select
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            name="projectCategory"
                            onChange={(e) =>
                                setProjectDetails({
                                    ...projectDetails,
                                    [e.target.name]: e.target.value,
                                })
                            }
                            defaultChecked
                        >
                            <option value={""} selected>
                                Please select the category
                            </option>
                            {category.map((items, index) => {
                                return (
                                    <option key={index} value={items._id}>
                                        {items.categoryName}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="projectUrl"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Project URL
                        </label>
                        <input
                            type="url"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=""
                            name="projectUrl"
                            onChange={(e) =>
                                setProjectDetails({
                                    ...projectDetails,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="projectlead"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Project Lead
                        </label>
                        <select
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            name="projectLead"
                            onChange={(e) =>
                                setProjectDetails({
                                    ...projectDetails,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        >
                            <option value={""} selected>
                                Please select the project lead
                            </option>
                            {members.map((member, index) => {
                                return (
                                    <option key={index} value={member._id}>
                                        {member.userName}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="description"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Description
                        </label>
                        <textarea
                            rows="4"
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Write about your project..."
                            name="description"
                            onChange={(e) =>
                                setProjectDetails({
                                    ...projectDetails,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={create}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
};

export default CreateProjectFrom;
