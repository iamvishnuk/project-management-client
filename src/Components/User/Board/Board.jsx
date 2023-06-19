import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import TaskCard from "../cards/TaskCard";
import { useState } from "react";
import Modal from "../Modal/Modal";
import CreateTaskModal from "../Modal/CreateTaskModal";
import { deleteBoard } from "../../../Services/boardApi";
import { toast } from "react-toastify";
import DeleteConfirmModal from "../Modal/DeleteConfirmModal";
import { Droppable } from "react-beautiful-dnd";

const Board = ({ data, index, getData }) => {
    const [createTaskModal, showCreateTaskModal] = useState(false);
    const [deleteConfirmModal, showDeleteConfirmModal] = useState(false);
    const [deleteBoardId, setDeleteBoardId] = useState("");

    const boardDelete = () => {
        deleteBoard(deleteBoardId)
            .then((res) => {
                toast.success(res.data.message);
                showDeleteConfirmModal(false);
                getData();
            })
            .catch((error) => console.log(error));
    };

    return (
        <>
            <div className="min-w-[290px] max-w-[300px] bg-gray-100 p-2 rounded-lg border-2 shadow h-full">
                <div className="bg-gray-100 text-black p-2 flex">
                    <p className="text-lg leading-7 flex-1 font-medium">
                        {data.boardName}
                    </p>
                    <RiDeleteBin6Line
                        size={22}
                        onClick={() => {
                            setDeleteBoardId(data._id);
                            showDeleteConfirmModal(true);
                        }}
                    />
                </div>
                {/* for cards */}
                <div
                    className={`overflow-y-auto scrollbar-thin scrollbar-gray-100 scrollbar-thumb-gray-200 min-h-[100px]`}
                    // isDraggingOver={snapshot.isDraggingOver}
                >
                    <Droppable droppableId={data.boardName}>
                        {(provided, snapshot) => (
                            <div
                                className={`grid gap-3 max-h-screen min-h-[100px]  ${
                                    snapshot.isDraggingOver
                                        ? "bg-green-200"
                                        : ""
                                }`}
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {data?.task.map((items, index) => (
                                    <TaskCard
                                        key={index}
                                        items={items}
                                        index={index}
                                        boarName={data.boardName}
                                        getData={getData}
                                    />
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    {index == 0 && (
                        <div className="bg-white shadow rounded-sm py-2">
                            <div
                                className="flex items-center justify-center hover:cursor-pointer"
                                onClick={() => {
                                    showCreateTaskModal(true);
                                }}
                            >
                                <AiOutlinePlus />
                                <p className="font-medium">Create New Task</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {/* create task modal */}
            <Modal
                isVisible={createTaskModal}
                onClose={() => showCreateTaskModal(false)}
            >
                <CreateTaskModal
                    boardId={data._id}
                    onClose={() => showCreateTaskModal(false)}
                    getData={getData}
                />
            </Modal>
            {/* confirm board delete Modal */}
            <Modal
                isVisible={deleteConfirmModal}
                onClose={() => showDeleteConfirmModal(false)}
            >
                <DeleteConfirmModal
                    description={
                        "You won't be able to revert this! All data in the board will be deleted"
                    }
                    onDelete={boardDelete}
                    onclose={() => showDeleteConfirmModal(false)}
                />
            </Modal>
        </>
    );
};

export default Board;
