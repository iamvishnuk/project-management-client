import React from "react";
import Board from "../Components/User/Board/Board";

const BoardPage = () => {
    return (
        <>
            <div className="overflow-x-auto h-full scrollbar-hide">
                <div className="flex gap-3 min-w-fit">
                    <Board />
                    <Board />
                    <Board />
                </div>
            </div>
        </>
    );
};

export default BoardPage;
