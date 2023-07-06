import React, { useEffect } from "react";
import Select from "react-select";
import { useState } from "react";
import { getAccessMembersList } from "../../../Services/userApi";
import { priorityOptions, taskTypeOpions } from "../../../constant/constant";
import { useSelector } from "react-redux";
import { createNewTask } from "../../../Services/boardApi";
import { toast } from "react-toastify";

const CreateTaskModal = ({ boardId, onClose, getData }) => {
    const [accessMemberList, setAcessMemberList] = useState([]);
    const [taskType, setTaskType] = useState(null);
    const [shortSummary, setShortSummary] = useState("");
    const [description, setDescription] = useState("");
    const [assignee, setAssignee] = useState(null);
    const [priority, setPriority] = useState(null);
    const [workHours, setWorkHours] = useState(null)
    const { _id } = useSelector((state) => state.project.value);

    // data for create task function
    const newtask = {
        taskType: taskType && taskType.value,
        shortSummary: shortSummary,
        description: description,
        assignee: assignee && assignee.value,
        priority: priority && priority.value,
        workHours: workHours,
    };

    useEffect(() => {
        // getting the memeber in the project for selecting the the assignee
        getAccessMembersList(_id)
            .then((res) => {
                setAcessMemberList(res.data.accessMemberList);
            })
            .catch((error) => {});
    }, []);

    // changing the acccess member list for select
    const option = accessMemberList.map((member) => {
        return { value: member._id, label: member.userName };
    });

    // creating new task
    const createTask = () => {
        createNewTask(boardId, _id, newtask)
            .then((res) => {
                onClose();
                getData();
            })
            .catch((error) => toast.error(error.response.data.message));
    };

    return (
        <>
            <div className="overflow-auto h-[600px]">
                <div className="w-[700px] py-2 px-5">
                    <h1 className="font-medium text-xl">Create task</h1>
                    <div className="w-full my-3">
                        <div className="mb-6">
                            <label
                                htmlFor="projectCategory"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Task type
                            </label>
                            <Select
                                options={taskTypeOpions}
                                getOptionLabel={(type) => (
                                    <div className="flex items-center">
                                        <span className="mr-2">
                                            {type.icon}
                                        </span>
                                        {type.label}
                                    </div>
                                )}
                                name="taskType"
                                onChange={setTaskType}
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Short summary about the task
                            </label>
                            <input
                                type="text"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="task name..."
                                name="shortSummary"
                                value={shortSummary}
                                onChange={(e) =>
                                    setShortSummary(e.target.value)
                                }
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Description
                            </label>
                            <textarea
                                className="w-full border-gray-300 rounded-md"
                                name=""
                                rows="5"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Work Hours
                            </label>
                            <input
                                type="number"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Enter the work hour"
                                name="workHours"
                                value={workHours}
                                onChange={(e) =>
                                    setWorkHours(e.target.value)
                                }
                            />
                        </div>
                        <div className="mb-6">
                            <label
                                htmlFor="projectName"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Assignee
                            </label>
                            <Select
                                options={option}
                                name="assignee"
                                onChange={setAssignee}
                            />
                        </div>
                        <div className="mb-6">
                            <label
                                htmlFor="projectCategory"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Priority
                            </label>
                            <Select
                                options={priorityOptions}
                                getOptionLabel={(options) => (
                                    <div className="flex items-center">
                                        <span>{options.icon}</span>
                                        {options.label}
                                    </div>
                                )}
                                name="priority"
                                onChange={setPriority}
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                className="bg-blue-600 text-white font-medium py-1 px-3 mr-2 rounded-md hover:bg-blue-500"
                                onClick={createTask}
                            >
                                Create
                            </button>
                            <button
                                className="text-black py-1 px-2 rounded-md hover:bg-gray-300"
                                onClick={() => onClose()}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateTaskModal;
