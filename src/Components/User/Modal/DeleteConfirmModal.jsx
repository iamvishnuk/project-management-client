import React from "react";

const DeleteConfirmModal = ({ description, onDelete, onclose }) => {
    return (
        <>
            <div className="w-[600px] p-7">
                <div className="text-center py-6">
                    <i className="fa-solid fa-trash text-red-600 text-5xl"></i>
                    <h2 className="text-4xl text-gray-500 font-normal mt-10 mb-8">
                        Are you sure ?
                    </h2>
                    <h2 className="font-light text-2xl my-8">
                        {description
                            ? description
                            : "You won't be able to revert this!"}
                    </h2>
                    <button
                        className="bg-sky-500 py-2 px-4 border-gray border-opacity-30 text-white font-light text-xl rounded-lg border-4 mr-2"
                        onClick={onDelete}
                    >
                        Yes, delete it!
                    </button>
                    <button
                        className="bg-red-600 py-2 px-4 border-gray border-opacity-30 text-white font-light text-xl rounded-lg border-4 ml-2"
                        onClick={onclose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </>
    );
};

export default DeleteConfirmModal;
