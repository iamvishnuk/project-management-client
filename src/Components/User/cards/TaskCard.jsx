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

const TaskCard = ({ items }) => {
    const [viewTaskModal, showViewTaskModal] = useState(false);
    return (
        <>
            <div
                draggable
                className="p-2 bg-white shadow rounded-sm hover:cursor-pointer"
                onClick={() => showViewTaskModal(true)}
            >
                <p className="text-sm">{items.shortSummary}</p>
                <div className="flex justify-between p-2 items-center">
                    <div className="w-[35px] h-[35px] rounded-full bg-gradient-to-r from-cyan-400 to-violet-600 flex justify-center items-center uppercase font-medium">
                        {items?.assignee?.userName[0]}
                    </div>
                    <div className="flex items-center">
                        {items?.priority === "Highest" && (
                            <MdKeyboardDoubleArrowUp size={25} color="red" />
                        )}
                        {items?.priority === "High" && (
                            <MdKeyboardArrowUp size={25} color="red" />
                        )}
                        {items?.priority === "Low" && (
                            <MdKeyboardArrowDown size={25} color="green" />
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
            </div>
            <Modal
                isVisible={viewTaskModal}
                onClose={() => showViewTaskModal(false)}
            >
                <ViewTaskModal />
            </Modal>
        </>
    );
};

export default TaskCard;
