import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import TaskCard from "../cards/TaskCard";
import { useState } from "react";
import Modal from "../Modal/Modal";
import CreateTaskModal from "../Modal/CreateTaskModal";

const Board = () => {
    const [createTaskModal, showCreateTaskModal] = useState(false);
    return (
        <>
            <div className="min-w-[290px] bg-gray-100 p-2 rounded-lg border-2 shadow h-full">
                <div className="bg-gray-100 text-black p-2 flex">
                    <p className="text-lg leading-7 flex-1 font-medium">
                        Title
                    </p>
                    <AiOutlinePlus size={22} />
                </div>
                {/* for cards */}
                <div className="overflow-y-auto scrollbar-thin scrollbar-gray-100 scrollbar-thumb-gray-200">
                    <div className="grid gap-3 max-h-screen">
                        <TaskCard />
                        <TaskCard />
                        <TaskCard />
                        <div className="bg-white shadow rounded-sm py-2">
                            <div className="flex items-center justify-center hover:cursor-pointer" onClick={() => {
                                showCreateTaskModal(true)
                            }}>
                                <AiOutlinePlus />
                                <p className="font-medium">Create New Task</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                isVisible={createTaskModal}
                onClose={() => showCreateTaskModal(false)}
            >
                <CreateTaskModal />
            </Modal>
        </>
    );
};

export default Board;
