import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import Select from "react-select";
import { BsCheckLg } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { priorityOptions, taskTypeOpions } from "../../../constant/constant";
import { editShortSummary } from "../../../Services/boardApi";

export const ViewTaskModal = ({ item, boardName, getData }) => {
    // for showing the edite option
    const [taskNameEdite, setTaskNameEdite] = useState(false);
    const [descriptionEdit, setDescriptionEdit] = useState(false);
    const [changeAssignee, setChangeAssignee] = useState(false);
    const [editPriority, setEditPriority] = useState(false);
    const [changeStatus, setChangeStatus] = useState(false);
    // for storing the value of editing field
    const [value, setValue] = useState("");

    // for displaying the task type
    const matchedTaskType = taskTypeOpions.find(
        (value) => item.taskType == value.value
    );

    // displaying the priority of the task
    const matchedPriority = priorityOptions.find(
        (value) => item.priority == value.value
    );

    const shortSummaryEdit = () => {
        editShortSummary({
            value: value,
            boardName: boardName,
            taksId: item._id,
        })
            .then((res) => {
                console.log(res);
                getData();
                setTaskNameEdite(false)
            })
            .catch((error) => {
                console.log(error);
            });
    };

    console.log(value);

    return (
        <>
            <div className="overflow-auto p-2">
                <div className="w-[1000px] ">
                    <div className="flex justify-between items-center ">
                        <div>
                            <span className="hover:bg-gray-100 py-1 px-3 rounded-md flex items-center">
                                {matchedTaskType && (
                                    <>
                                        {matchedTaskType.icon}
                                        <span className="ml-2">
                                            {matchedTaskType.value}
                                        </span>
                                    </>
                                )}
                            </span>
                        </div>
                        <div>
                            <RiDeleteBin6Line size={20} color="gray" />
                        </div>
                    </div>
                    <div className="flex p-3">
                        <div className="w-4/6 p-1">
                            {taskNameEdite ? (
                                <div className="mb-3">
                                    <div>
                                        <textarea
                                            name=""
                                            id=""
                                            cols="65"
                                            rows="2"
                                            value={value}
                                            onChange={(e) =>
                                                setValue(e.target.value)
                                            }
                                        ></textarea>
                                    </div>
                                    <button className="p-2 bg-blue-700 rounded-md text-white mr-2 hover:bg-blue-600">
                                        <BsCheckLg
                                            size={20}
                                            onClick={() => {
                                                shortSummaryEdit();
                                            }}
                                        />
                                    </button>
                                    <button
                                        className="p-2 rounded-md hover:bg-gray-300"
                                        onClick={() => setTaskNameEdite(false)}
                                    >
                                        <RxCross2 size={20} />
                                    </button>
                                </div>
                            ) : (
                                <div
                                    className="mb-3"
                                    onClick={() => {
                                        setValue(item?.shortSummary);
                                        setTaskNameEdite(true);
                                    }}
                                >
                                    <h1 className="font-medium text-2xl hover:bg-gray-200 p-1">
                                        {item && item?.shortSummary}
                                    </h1>
                                </div>
                            )}

                            <div className="mb-3">
                                <h1 className="font-medium mb-2">
                                    Description
                                </h1>
                                <div className="text-gray-700">
                                    {descriptionEdit ? (
                                        <>
                                            <div>
                                                <textarea
                                                    name=""
                                                    id=""
                                                    cols="65"
                                                    rows="5"
                                                ></textarea>
                                            </div>
                                            <button className="p-2 bg-blue-700 rounded-sm text-white mr-2 hover:bg-blue-600">
                                                Save
                                            </button>
                                            <button
                                                className="p-2 rounded-sm hover:bg-gray-300"
                                                onClick={() =>
                                                    setDescriptionEdit(false)
                                                }
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <div
                                            onClick={() =>
                                                setDescriptionEdit(true)
                                            }
                                        >
                                            {item && (
                                                <p
                                                    dangerouslySetInnerHTML={{
                                                        __html: item.description,
                                                    }}
                                                />
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="py-3">
                                <h1 className="mb-2 font-medium">Comments</h1>
                                <div className="flex p-2">
                                    <div className="m-1">
                                        <div className="w-[40px] h-[40px] bg-green-600 rounded-full"></div>
                                    </div>
                                    <div className="flex-grow">
                                        <textarea
                                            rows={3}
                                            className="w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Write your comments..."
                                        ></textarea>
                                        <button className="py-1 px-3 rounded-sm bg-blue-700 text-white hover:bg-blue-600 mr-2">
                                            save
                                        </button>
                                        <button className="py-1 px-3 rounded-sm hover:bg-gray-200">
                                            cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-3/6 p-1">
                            <div className="mb-5">
                                <h1 className="font-medium text-sm text-gray-500 mb-1">
                                    STATUS
                                </h1>
                                {changeStatus ? (
                                    <div>
                                        <Select
                                            options={priorityOptions}
                                            getOptionLabel={(
                                                priorityOptions
                                            ) => (
                                                <div className="flex items-center">
                                                    <span>
                                                        {priorityOptions.icon}
                                                    </span>
                                                    {priorityOptions.label}
                                                </div>
                                            )}
                                        />
                                        <button className="p-2 bg-blue-700 rounded-md text-white mr-2 hover:bg-blue-600 mt-2">
                                            <BsCheckLg size={20} />
                                        </button>
                                        <button
                                            className="p-2 rounded-md hover:bg-gray-300 mt-2"
                                            onClick={() =>
                                                setChangeStatus(false)
                                            }
                                        >
                                            <RxCross2 size={20} />
                                        </button>
                                    </div>
                                ) : (
                                    <h1 onClick={() => setChangeStatus(true)}>
                                        {item && boardName}
                                    </h1>
                                )}
                            </div>
                            <div className="mb-5">
                                <h1 className="font-medium text-sm text-gray-500 mb-1">
                                    ASSIGNEE
                                </h1>
                                {changeAssignee ? (
                                    <div>
                                        <Select />
                                        <button className="p-2 bg-blue-700 rounded-md text-white mr-2 hover:bg-blue-600 mt-2">
                                            <BsCheckLg size={20} />
                                        </button>
                                        <button
                                            className="p-2 rounded-md hover:bg-gray-300 mt-2"
                                            onClick={() =>
                                                setChangeAssignee(false)
                                            }
                                        >
                                            <RxCross2 size={20} />
                                        </button>
                                    </div>
                                ) : (
                                    <h1 onClick={() => setChangeAssignee(true)}>
                                        {item && item?.assignee
                                            ? item?.assignee.userName
                                            : "Unassigned"}
                                    </h1>
                                )}
                            </div>
                            <div className="mb-5">
                                <h1 className="font-medium text-sm text-gray-500 mb-1">
                                    PRIORITY
                                </h1>
                                {editPriority ? (
                                    <>
                                        <div>
                                            <Select
                                                options={priorityOptions}
                                                getOptionLabel={(
                                                    priorityOptions
                                                ) => (
                                                    <div className="flex items-center">
                                                        <span>
                                                            {
                                                                priorityOptions.icon
                                                            }
                                                        </span>
                                                        {priorityOptions.label}
                                                    </div>
                                                )}
                                            />
                                        </div>
                                        <button className="p-2 bg-blue-700 rounded-md text-white mr-2 hover:bg-blue-600 mt-2">
                                            <BsCheckLg size={20} />
                                        </button>
                                        <button
                                            className="p-2 rounded-md hover:bg-gray-300 mt-2"
                                            onClick={() =>
                                                setEditPriority(false)
                                            }
                                        >
                                            <RxCross2 size={20} />
                                        </button>
                                    </>
                                ) : (
                                    <div
                                        className="flex items-center"
                                        onClick={() => setEditPriority(true)}
                                    >
                                        {matchedPriority && (
                                            <>
                                                {matchedPriority.icon}
                                                <span className="ml-2">
                                                    {matchedPriority.value}
                                                </span>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
