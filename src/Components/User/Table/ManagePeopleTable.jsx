import React from "react";
import { useState } from "react";
import { getAllPeople, removePeople } from "../../../Services/userApi";
import { useEffect } from "react";
import Modal from "../Modal/Modal";
import { toast } from "react-toastify";

export const ManagePeopleTable = () => {
    const [people, setPeople] = useState([]);
    const [modal, showModal] = useState(false);
    const [userId, setUserId] = useState("");

    const fetchData = () => {
        getAllPeople()
            .then((res) => setPeople(res.data.peopleData))
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        fetchData();
    }, []);

    const remove = () => {
        removePeople(userId)
            .then((res) => {
                toast.success(res.data.message);
                fetchData();
                showModal(false);
            })
            .catch((error) => console.log(error));
    };

    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg border">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Username
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {people.map((user, index) => {
                            return (
                                <tr
                                    key={index}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                                >
                                    <td className="px-6 py-4">
                                        {user.userName}
                                    </td>
                                    <td className="px-6 py-4">{user.email}</td>
                                    <td className="px-6 py-4">
                                        <button
                                            className="bg-red-600 text-white py-1 px-3 rounded-md font-medium hover:bg-red-700"
                                            onClick={() => {
                                                setUserId(user._id);
                                                showModal(true);
                                            }}
                                        >
                                            Remove
                                        </button>
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
                        <i className="fa-solid fa-user-minus text-5xl text-red-600"></i>
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
