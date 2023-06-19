import React from "react";
import { useState } from "react";
import { FaBug } from "react-icons/fa";
import {
    MdKeyboardDoubleArrowUp,
    MdKeyboardArrowUp,
    MdKeyboardArrowDown,
    MdKeyboardDoubleArrowDown,
} from "react-icons/md";
import { RiTaskFill } from "react-icons/ri";
import Modal from "../Modal/Modal";
import { ViewTaskModal } from "../Modal/ViewTaskModal";
import { Draggable } from "react-beautiful-dnd";

const TaskCard = ({ items, index, boarName, getData }) => {
    const [viewTaskModal, showViewTaskModal] = useState(false);
    return (
        <>
            <Draggable draggableId={items._id} index={items.taskId} key={index}>
                {(provided, snapshot) => (
                    <div
                        className={`p-2 shadow rounded-sm hover:cursor-pointer bg-white ${
                            snapshot.isDragging ? "bg-blue-300" : ""
                        }`}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        onClick={() => showViewTaskModal(true)}
                    >
                        <p className="text-sm">{items.shortSummary}</p>
                        <div className="flex justify-between p-2 items-center">
                            <div className="w-[35px] h-[35px] rounded-full bg-gradient-to-r from-cyan-400 to-violet-600 flex justify-center items-center uppercase font-medium">
                                {items?.assignee?.userName[0]}
                            </div>
                            <div className="flex items-center">
                                {items?.priority === "Highest" && (
                                    <MdKeyboardDoubleArrowUp
                                        size={25}
                                        color="red"
                                    />
                                )}
                                {items?.priority === "High" && (
                                    <MdKeyboardArrowUp size={25} color="red" />
                                )}
                                {items?.priority === "Low" && (
                                    <MdKeyboardArrowDown
                                        size={25}
                                        color="green"
                                    />
                                )}
                                {items?.priority === "Lowest" && (
                                    <MdKeyboardDoubleArrowDown
                                        size={25}
                                        color="green"
                                    />
                                )}
                                {items?.taskType === "New task" && (
                                    <RiTaskFill size={20} color="blue" />
                                )}
                                {items?.taskType === "Bug" && (
                                    <FaBug size={18} color="red" />
                                )}
                            </div>
                        </div>
                        {provided.placeholder}
                    </div>
                )}
            </Draggable>
            <Modal
                isVisible={viewTaskModal}
                onClose={() => showViewTaskModal(false)}
            >
                <ViewTaskModal
                    item={items}
                    boardName={boarName}
                    getData={getData}
                />
            </Modal>
        </>
    );
};

export default TaskCard;
