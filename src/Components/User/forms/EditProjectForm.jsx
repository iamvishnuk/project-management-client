import React, { useEffect } from "react";
import {
    getEditProjectDetails,
    getMembersAndCategory,
    editProject,
} from "../../../Services/userApi";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

const EditProjectForm = () => {
    const params = useParams();
    const [projectDetails, setProjectDetails] = useState(null);
    const [members, setMembers] = useState([]);
    const [category, setCategory] = useState([]);
    const navigate = useNavigate();

    // for getting the data for edit project details
    useEffect(() => {
        getEditProjectDetails(params.id)
            .then((res) => {
                setProjectDetails(res.data.projectData);
            })
            .catch((error) => {
                console.log(error);
            });
        getMembersAndCategory()
            .then((res) => {
                setCategory(res.data.categoryDetails);
                setMembers(res.data.memberDetails);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    // for handling the changes in the input
    const handleInput = (e) => {
        const { name, value } = e.target;
        setProjectDetails((preValue) => ({
            ...preValue,
            [name]: value,
        }));
    };

    // edit function
    const edit = (e) => {
        e.preventDefault();
        editProject(projectDetails)
            .then((res) => {
                console.log(res);
                toast.success(res.data.message);
                navigate("/project-management");
            })
            .catch((error) => {
                console.log(error);
            });
    };

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
                            value={
                                projectDetails == null
                                    ? ""
                                    : projectDetails.projectName
                            }
                            onChange={handleInput}
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
                            onChange={handleInput}
                        >
                            <option
                                value={
                                    projectDetails == null
                                        ? ""
                                        : projectDetails.projectCategory._id
                                }
                                selected
                            >
                                {projectDetails == null
                                    ? ""
                                    : projectDetails.projectCategory
                                          .categoryName}
                            </option>
                            {category
                                .filter(
                                    (items) =>
                                        items._id !==
                                        projectDetails.projectCategory._id
                                )
                                .map((items, index) => {
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
                            value={
                                projectDetails == null
                                    ? ""
                                    : projectDetails.projectUrl
                            }
                            onChange={handleInput}
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
                            onChange={handleInput}
                        >
                            <option
                                value={
                                    projectDetails == null
                                        ? ""
                                        : projectDetails.projectLead._id
                                }
                                selected
                            >
                                {projectDetails == null
                                    ? ""
                                    : projectDetails.projectLead.userName}
                            </option>
                            {members
                                .filter(
                                    (member) =>
                                        member._id !==
                                        projectDetails.projectLead._id
                                )
                                .map((member, index) => {
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
                            value={
                                projectDetails == null
                                    ? ""
                                    : projectDetails.description
                            }
                            onChange={handleInput}
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={edit}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
};

export default EditProjectForm;
