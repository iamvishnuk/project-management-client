import React from "react";
import Sidebar from "../Components/User/Sidebar/Sidebar";
import { ToastContainer } from "react-toastify";

const KanbanBoard = () => {
    return (
        <>
            <div className="flex">
                <Sidebar />
                <div>
                    <h1>Kanban Board</h1>
                </div>
            </div>
            <ToastContainer/>
        </>
    );
};

export default KanbanBoard;
