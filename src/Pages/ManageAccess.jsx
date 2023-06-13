import React, { useEffect } from "react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import Modal from "../Components/User/Modal/Modal";
import Select from "react-select";
import { getMembers, giveAccessToProject } from "../Services/userApi";

const ManageAccess = () => {
    const [modal, showModal] = useState(false);
    const [members, setMembers] = useState([]); // storing the members data
    const [access, setAccess] = useState(null);

    // for changing members array for the select method
    const options = members.map((data) => {
        return { value: data._id, label: data.userName };
    });

    useEffect(() => {
        getMembers()
            .then((res) => {
                setMembers(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const add = () => {
        giveAccessToProject(access)
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <div className="flex justify-between">
                <h1 className="font-medium text-2xl">Access</h1>
                <button
                    className="bg-btn-green text-white font-medium px-3 py-1 rounded-md flex items-center"
                    onClick={() => showModal(true)}
                >
                    <FaPlus className="mr-1" />
                    Add people
                </button>
            </div>
            <div>
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
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    Apple MacBook Pro 17"
                                </th>
                                <td className="px-6 py-4">Silver</td>
                                <td className="px-6 py-4">Laptop</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal isVisible={modal} onClose={() => showModal(false)}>
                <div className="w-[400px] p-5">
                    <h1 className="font-medium text-xl">Add people</h1>
                    <div className="my-9">
                        <Select
                            options={options}
                            placeholder="Search for username"
                            isMulti
                            isSearchable
                            noOptionsMessage={() => "No users found"}
                            onChange={setAccess}
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            onClick={() => showModal(false)}
                            className="rounded-md font-medium hover:bg-gray-300 py-2 px-3"
                        >
                            Cancel
                        </button>
                        <button
                            className="rounded-md font-medium py-2 px-3 bg-blue-600 text-white hover:bg-blue-700"
                            onClick={add}
                        >
                            Add
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ManageAccess;
