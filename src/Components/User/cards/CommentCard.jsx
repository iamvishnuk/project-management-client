import React from "react";
import { useSelector } from "react-redux";
import { deleteComment } from "../../../Services/boardApi";

export const CommentCard = ({ comment, boarName, taskId, getData }) => {
    const { userId } = useSelector((state) => state.user);
    const commentDelete = () => {
        console.log("this fuction called");
        deleteComment(boarName, taskId, comment._id)
            .then((res) => {
                getData()
            })
            .catch((error) => console.log(error));
    };
    return (
        <>
            <div className="flex gap-4 p-3">
                <div>
                    <div className="w-[40px] h-[40px] rounded-full bg-blue-200"></div>
                </div>
                <div>
                    <h1 className="font-semibold">
                        {comment && comment?.userId?.userName}
                    </h1>
                    <p className="text-sm">{comment && comment?.message}</p>
                    {userId === comment?.userId?._id && (
                        <button
                            className="text-sm font-normal text-gray-500 hover:underline"
                            onClick={() => {
                                commentDelete();
                            }}
                        >
                            Delete
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};
