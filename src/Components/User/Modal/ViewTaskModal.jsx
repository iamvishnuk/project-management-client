import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import Select from "react-select";
import { BsCheckLg } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { priorityOptions, taskTypeOpions } from "../../../constant/constant";
import {
    editTask,
    getBoardNames,
    editChangeBoard,
} from "../../../Services/boardApi";
import { useSelector } from "react-redux";
import { getAccessMembersList } from "../../../Services/userApi";

export const ViewTaskModal = ({ item, boardName, getData }) => {
    // for showing the edite option
    const [taskNameEdite, setTaskNameEdite] = useState(false);
    const [descriptionEdit, setDescriptionEdit] = useState(false);
    const [changeAssignee, setChangeAssignee] = useState(false);
    const [editPriority, setEditPriority] = useState(false);
    const [changeStatus, setChangeStatus] = useState(false);

    // for storing the value of editing field and name of the field
    const [value, setValue] = useState("");
    const [fieldName, setFieldName] = useState("");
    const [changeBoard, setChangeBoard] = useState("");
    const [comment, setComment] = useState("");

    const [sample, setSample] = useState("");

    const [accessMemberList, setAcessMemberList] = useState([]);
    const [boardNames, setBoardNames] = useState([]);

    // project id from redux
    const { _id } = useSelector((state) => state.project.value);
    const { userId } = useSelector((state) => state.user);

    //changing the members array for the select method
    const option = accessMemberList.map((member) => {
        return { value: member._id, label: member.userName };
    });

    //changing the boardNames array for the select method
    const boardNameOptions = boardNames.map((board) => {
        return { value: board, label: board };
    });

    // for displaying the task type
    const matchedTaskType = taskTypeOpions.find(
        (value) => item.taskType == value.value
    );

    // displaying the priority of the task
    const matchedPriority = priorityOptions.find(
        (value) => item.priority == value.value
    );

    // for editing shortSummary, description, assignee, and priority
    const editData = () => {
        editTask({
            value: value,
            boardName: boardName,
            taskId: item._id,
            fieldName: fieldName,
        })
            .then((res) => {
                getData();
                setChangeAssignee(false);
                setEditPriority(false);
                setDescriptionEdit(false);
                setTaskNameEdite(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // for getting the access members of the project
    useEffect(() => {
        getAccessMembersList(_id)
            .then((res) => {
                setAcessMemberList(res.data.accessMemberList);
            })
            .catch((error) => console.log(error));
        getBoardNames()
            .then((res) => {
                console.log(res.data);
                setBoardNames(res.data.boardNames);
            })
            .catch((error) => console.log(error.message));
    }, []);

    //for changing the board
    const boardChange = () => {
        const value = {
            source: boardName,
            destination: changeBoard.value,
            taskId: item.taskId,
        };
        editChangeBoard(value)
            .then((res) => {
                console.log(res.data);
                getData();
                setChangeStatus(false);
            })
            .catch((error) => console.log(error));
    };

    const sampleFun = () => {
        console.log(sample)
    }

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
                                    <button
                                        className="p-2 bg-blue-700 rounded-md text-white mr-2 hover:bg-blue-600"
                                        onClick={() => {
                                            editData();
                                        }}
                                    >
                                        <BsCheckLg size={20} />
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
                                        setFieldName("shortSummary");
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
                                                    value={value}
                                                    onChange={(e) =>
                                                        setValue(e.target.value)
                                                    }
                                                ></textarea>
                                            </div>
                                            <button
                                                className="p-2 bg-blue-700 rounded-sm text-white mr-2 hover:bg-blue-600"
                                                onClick={() => {
                                                    editData();
                                                }}
                                            >
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
                                            onClick={() => {
                                                setValue(item?.description);
                                                setFieldName("description");
                                                setDescriptionEdit(true);
                                            }}
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
                                            value={comment}
                                            onChange={(e) => {
                                                setComment(e.target.value);
                                            }}
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
                                            options={boardNameOptions}
                                            onChange={setChangeBoard}
                                        />
                                        <button
                                            className="p-2 bg-blue-700 rounded-md text-white mr-2 hover:bg-blue-600 mt-2"
                                            onClick={() => {
                                                boardChange();
                                            }}
                                        >
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
                                        <Select
                                            options={option}
                                            isSearchable
                                            placeholder="Search for username"
                                            onChange={setValue}
                                        />
                                        <button
                                            className="p-2 bg-blue-700 rounded-md text-white mr-2 hover:bg-blue-600 mt-2"
                                            onClick={() => {
                                                editData();
                                            }}
                                        >
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
                                    <h1
                                        onClick={() => {
                                            setFieldName("assignee");
                                            setChangeAssignee(true);
                                        }}
                                    >
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
                                                isSearchable
                                                placeholder="Search for priority options"
                                                onChange={setValue}
                                            />
                                        </div>
                                        <button
                                            className="p-2 bg-blue-700 rounded-md text-white mr-2 hover:bg-blue-600 mt-2"
                                            onClick={() => {
                                                editData();
                                            }}
                                        >
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
                                        onClick={() => {
                                            setEditPriority(true);
                                            setValue(matchedPriority.value);
                                            setFieldName("priority");
                                        }}
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
                            <p
                                contentEditable="true"
                                suppressContentEditableWarning={true}
                                onInput={(e) => {
                                    setSample(e.currentTarget.textContent);
                                }}
                                onBlur={sampleFun}
                            >
                                Text inside div
                            </p>
                            <p>{sample && sample}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
