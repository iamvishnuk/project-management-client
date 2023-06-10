import React from "react";

const Modal = ({ isVisible, onClose, children }) => {
    if (!isVisible) return null;
    const handleClose = (e) => {
        if(e.target.id === "wrapper") onClose()
    }
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
            onClick={handleClose}
            id="wrapper"
        >
            <div className=" flex flex-col">
                <button
                    className="text-white text-2xl place-self-end"
                    onClick={() => onClose()}
                >
                    <i className="fa-solid fa-xmark"></i>
                </button>
                <div className="bg-white p-2 rounded-lg">{children}</div>
            </div>
        </div>
    );
};

export default Modal;
