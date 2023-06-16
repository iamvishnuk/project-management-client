import React from "react";
import { useState } from "react";
import { FaBug } from "react-icons/fa";
import { MdKeyboardDoubleArrowUp } from "react-icons/md"
import Modal from "../Modal/Modal"
import { ViewTaskModal } from "../Modal/ViewTaskModal";

const TaskCard = () => {
    const[viewTaskModal, showViewTaskModal] = useState(false)
    return (
        <>
            <div className="p-2 bg-white shadow rounded-sm hover:cursor-pointer" onClick={() => showViewTaskModal(true)}>
                <p className="text-sm">
                    Contrary to popular belief, Lorem Ipsum is not simply random
                    text.
                </p>
                <div className="flex justify-between p-2 items-center">
                    <div className="w-[35px] h-[35px] rounded-full bg-yellow-300 flex justify-center items-center">
                        V
                    </div>
                    <div className="flex items-center">
                        <MdKeyboardDoubleArrowUp size={25} color="red" />
                        <FaBug size={18} color="red" />
                    </div>
                </div>
            </div>
            <Modal isVisible={viewTaskModal} onClose={() => showViewTaskModal(false)}>
                <ViewTaskModal />
            </Modal>
        </>
    );
};

export default TaskCard;
