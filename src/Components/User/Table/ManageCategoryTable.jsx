import React, { useState } from "react";
import Modal from "../../../Components/User/Modal/Modal";
import { userAxiosInstance } from "../../../axios/AxiosInstance";
import { toast } from "react-toastify";

const MangeCategoryTable = ({ categoryData, onDelete }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditeModal] = useState(false);
    const [deleteCategoryId, setDeleteCategoryId] = useState("");

    const deleteCategory = async () => {
        try {
            const { data } = await userAxiosInstance.get(
                `/delete-category/${deleteCategoryId}`,
                {
                    withCredentials: true,
                }
            );
            // console.log(data)
            if (data.delete) {
                console.log("delete if condition");
                toast.success(data.message);
                setShowDeleteModal(false);
                onDelete();
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <>
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
                            {categoryData.map((items, index) => {
                                return (
                                    <tr key={items._id}>
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                            {index + 1}
                                        </td>
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                            {items.categoryName}
                                        </td>
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                            {items.categoryDescription}
                                        </td>
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                            {items.createdAt}
                                        </td>
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                            <button
                                                onClick={() =>
                                                    setShowEditeModal(true)
                                                }
                                                className="m-2"
                                            >
                                                <i className="fa-solid fa-pen-to-square text-blue-700"></i>
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setShowDeleteModal(true);
                                                    setDeleteCategoryId(
                                                        items._id
                                                    );
                                                }}
                                                className="m-2"
                                            >
                                                <i className="fa-solid fa-trash text-red-600"></i>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal
                isVisible={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
            >
                <div className="w-[600px] p-7">
                    <div className="text-center py-6">
                        <i className="fa-solid fa-trash text-red-600 text-5xl"></i>
                        <h2 className="text-4xl text-gray-500 font-normal mt-10 mb-8">
                            Are you sure ?
                        </h2>
                        <h2 className="font-light text-2xl my-8">
                            You won't be able to revert this!
                        </h2>
                        <button
                            onClick={deleteCategory}
                            className="bg-sky-500 py-2 px-4 border-gray border-opacity-30 text-white font-light text-xl rounded-lg border-4 mr-2"
                        >
                            Yes, delete it!
                        </button>
                        <button
                            onClick={() => setShowDeleteModal(false)}
                            className="bg-red-600 py-2 px-4 border-gray border-opacity-30 text-white font-light text-xl rounded-lg border-4 ml-2"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>
            <Modal
                isVisible={showEditModal}
                onClose={() => setShowEditeModal(false)}
            >
                <div className="w-[600px]">
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
                                    name="categoryName"
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
                                    name="categoryDescription"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button className="flex border py-2 px-4 rounded-lg bg-blue-700 bg-opacity-75 font-medium text-white">
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default MangeCategoryTable;
