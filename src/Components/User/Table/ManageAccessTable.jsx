import React, { useState } from "react";
import { removeAcess } from "../../../Services/userApi";
import Modal from "../Modal/Modal";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ManageAccessTable = ({ accessMemberList, getData }) => {
    const [memberId, setmemberId] = useState("");
    const [modal, showModal] = useState(false);
    const { _id, createdBy, projectLead } = useSelector((state) => state.project.value);
    const { userId } = useSelector((state) => state.user);
    const remove = () => {
        removeAcess(memberId, _id)
            .then((res) => {
                toast.success(res.data.message);
                showModal(false);
                getData();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg border mt-4">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                User name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {accessMemberList.map((member, index) => {
                            return (
                                <tr
                                    key={index}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {member.userName}
                                    </th>
                                    <td className="px-6 py-4">
                                        {member.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {createdBy == userId ||
                                        projectLead._id == userId ? (
                                            <button
                                                className="bg-yellow-300 font-medium px-3 py-1 rounded-md text-black hover:bg-yellow-400"
                                                onClick={() => {
                                                    setmemberId(member._id);
                                                    showModal(true);
                                                }}
                                            >
                                                Remove
                                            </button>
                                        ) : (
                                            <span>Disabled</span>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <Modal isVisible={modal} onClose={() => showModal(false)}>
                <div className="w-[600px] p-7">
                    <div className="text-center py-6">
                        <i class="fa-solid fa-user-minus text-5xl text-yellow-300"></i>
                        <h2 className="text-4xl text-gray-500 font-normal mt-10 mb-8">
                            Are you sure ?
                        </h2>
                        <button
                            className="bg-sky-500 py-2 px-4 border-gray border-opacity-30 text-white font-light text-xl rounded-lg border-4 mr-2"
                            onClick={remove}
                        >
                            Yes, remove
                        </button>
                        <button
                            className="bg-red-600 py-2 px-4 border-gray border-opacity-30 text-white font-light text-xl rounded-lg border-4 ml-2"
                            onClick={() => showModal(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ManageAccessTable;
