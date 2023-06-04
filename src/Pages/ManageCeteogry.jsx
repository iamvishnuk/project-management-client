import { useState } from "react";
import Modal from "../Components/User/Modal/Modal";
import Sidebar from "../Components/User/Sidebar/Sidebar";

const ManageCeteogry = () => {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <div className="flex">
                <Sidebar />
                <div className="bg-white p-10 font-semibold flex-1 h-screen">
                    <h1 className="text-2xl font-bold">Mange Category</h1>
                    <div className="mt-3 mb-3 w-full flex justify-end">
                        <button
                            className="bg-btn-green text-white font-medium px-3 py-1 rounded-md"
                            onClick={() => setShowModal(true)}
                        >
                            <i className="fa-solid fa-plus text-white mr-2"></i>
                            Create Category
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <div className="p-2 overflow-auto rounded-lg shadow border-2">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b-2 border-gray-200">
                                    <tr>
                                        <th className="uppercase p-3 text-sm font-semibold tracking-wide text-left">
                                            No
                                        </th>
                                        <th className="uppercase p-3 text-sm font-semibold tracking-wide text-left">
                                            Category Name
                                        </th>
                                        <th className="uppercase p-3 text-sm font-semibold tracking-wide text-left">
                                            Category Description
                                        </th>
                                        <th className="uppercase p-3 text-sm font-semibold tracking-wide text-left">
                                            Created At
                                        </th>
                                        <th className="uppercase p-3 text-sm font-semibold tracking-wide text-left">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    <tr>
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                            sdkfjoejrjljwld
                                        </td>
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                            sdkfjoejrjljwld dfjsdjfsdfjsfjsdfjs
                                            osjdpfjsdpfjpsdfjsjsjsfshsdjjksdhf
                                        </td>
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                            sdkfjoejrjljwld
                                        </td>
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                            sdkfjoejrjljwld
                                        </td>
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                            <button className="m-2">
                                                <i className="fa-solid fa-pen-to-square text-blue-700"></i>
                                            </button>
                                            <button className="m-2">
                                                <i className="fa-solid fa-trash text-red-600"></i>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
                <div className="p-5">
                    <h2 className="font-bold text-xl">
                        Add new Project Category
                    </h2>
                    <form action="">
                        <div className="my-5">
                            <label className="" htmlFor="">
                                Category Name
                            </label>
                            <input
                                className="w-full border rounded-md bg-transparent border-gray-400 p-3"
                                type="text"
                                placeholder="Enter your category name"
                            />
                        </div>
                        <div className="my-5">
                            <label className="" htmlFor="">
                                Category Description
                            </label>
                            <textarea
                                className="w-full border rounded-md bg-transparent border-gray-400 p-3"
                                type="text"
                                placeholder="Enter description about the category"
                            />
                        </div>
                        <div className="flex justify-end">
                            <button className="flex border py-2 px-4 rounded-lg bg-blue-700 bg-opacity-75 font-medium text-white">
                                Add
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
};

export default ManageCeteogry;
