import React from "react";

export const CommentCard = ({comment}) => {
    return (
        <>
            <div className="flex gap-4 p-3">
                <div>
                    <div className="w-[40px] h-[40px] rounded-full bg-blue-200"></div>
                </div>
                <div>
                    <h1 className="font-semibold">{comment && comment?.userId?.userName}</h1>
                    <p className="text-sm">
                        {comment && comment?.message}
                    </p>
                    <button className="text-sm font-medium hover:underline hidden">
                        Delete
                    </button>
                </div>
            </div>
        </>
    );
};
