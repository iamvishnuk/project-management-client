import React from "react";
import {
    MdKeyboardDoubleArrowUp,
    MdKeyboardArrowUp,
    MdKeyboardArrowDown,
    MdKeyboardDoubleArrowDown,
} from "react-icons/md";
import { RiTaskFill } from "react-icons/ri";
import { FaBug } from "react-icons/fa";
import Select from "react-select";
import JoditEditor from "jodit-react";
import { useRef } from "react";
import { useState } from "react";

const CreateTaskModal = () => {
    const editor = useRef(null);
    const [description, setDescription] = useState(null);
    console.log(description)

    //for priority select option
    const options = [
        {
            value: "Highest",
            label: "Highest",
            icon: <MdKeyboardDoubleArrowUp color="red" size={20} />,
        },
        {
            value: "High",
            label: "High",
            icon: <MdKeyboardArrowUp color="red" size={20} />,
        },
        {
            value: "Low",
            label: "Low",
            icon: <MdKeyboardArrowDown color="green" size={20} />,
        },
        {
            value: "Lowest",
            label: "Lowest",
            icon: <MdKeyboardDoubleArrowDown color="green" size={20} />,
        },
    ];

    // for issue type select option
    const type = [
        {
            value: "task",
            label: "Task",
            icon: <RiTaskFill color="blue" size={20} />,
        },
        { value: "bug", label: "Bug", icon: <FaBug color="red" size={20} /> },
    ];

    const assignee = [
        {value: "user 1", label: "user 1"},
        {value: "user 2", label: "user 2"},
        {value: "user 3", label: "user 3"},
    ]

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
                                Issue type
                            </label>
                            <Select
                                options={type}
                                getOptionLabel={(type) => (
                                    <div className="flex items-center">
                                        <span>{type.icon}</span>
                                        {type.label}
                                    </div>
                                )}
                            />
                        </div>
                        <div className="mb-6">
                            <label
                                htmlFor="projectName"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Short summary about the task
                            </label>
                            <input
                                type="text"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Enter your project name"
                                name="projectName"
                            />
                        </div>
                        <div className="mb-6">
                            <label
                                htmlFor="projectName"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Description
                            </label>
                            <JoditEditor
                                ref={editor}
                                value={description}
                                tabIndex={1}
                                onChange={(newContent) =>
                                    setDescription(newContent)
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
                            <Select options={assignee} />
                        </div>
                        <div className="mb-6">
                            <label
                                htmlFor="projectCategory"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Priority
                            </label>
                            <Select
                                options={options}
                                getOptionLabel={(options) => (
                                    <div className="flex items-center">
                                        <span>{options.icon}</span>
                                        {options.label}
                                    </div>
                                )}
                            />
                        </div>
                        <div className="flex justify-end">
                            <button className="bg-blue-600 text-white font-medium py-1 px-3 mr-2 rounded-md hover:bg-blue-500">Create</button>
                            <button className="text-black py-1 px-2 rounded-md hover:bg-gray-300">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateTaskModal;
