import { deleteProject } from "../../../Services/userApi";
import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import Modal from "../Modal/Modal";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeProjectDetails } from "../../../Redux/ProjectSlice";

const ManageProjectTable = ({ projectDetails, getData, search }) => {
    const [deleteModal, showDeleteModal] = useState(false);
    const [deleteCategoryId, setDeleteCategoryId] = useState("");
    const [page, setpage] = useState(1);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userId } = useSelector((state) => state.user);

    // function for delete the project
    const projectDelete = () => {
        deleteProject(deleteCategoryId).then((res) => {
            toast.success(res.data.message);
            showDeleteModal(false);
            getData();
        });
    };

    // for handling the pagenation
    const selectPageHandler = (selectPage) => {
            setpage(selectPage);
    };

    return (
        <>
            <div className="relative overflow-x-auto border-2 rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                No
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Project Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3">
                                lead
                            </th>
                            <th scope="col" className="px-6 py-3">
                                action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {projectDetails &&
                            projectDetails
                                .filter((data) =>
                                    data.projectName
                                        .toLowerCase()
                                        .includes(search)
                                )
                                .slice(page * 5 - 5, page * 5)
                                .map((project, index) => {
                                    return (
                                        <tr
                                            key={index}
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                        >
                                            <td className="px-6 py-4">
                                                {index + 1}
                                            </td>
                                            <th
                                                scope="row"
                                                className="px-6 py-4 font-medium text-blue-700 whitespace-nowrap dark:text-white hover:underline hover:cursor-pointer"
                                                onClick={() => {
                                                    dispatch(
                                                        changeProjectDetails(
                                                            project
                                                        )
                                                    );
                                                    navigate(
                                                        `/project-management/${project.projectName}/board`
                                                    );
                                                }}
                                            >
                                                {project.projectName}
                                            </th>
                                            <td className="px-6 py-4">
                                                {
                                                    project.projectCategory
                                                        .categoryName
                                                }
                                            </td>
                                            <td className="px-6 py-4">
                                                {project.projectLead.userName}
                                            </td>
                                            <td className="px-6 py-4">
                                                {project.members.includes(
                                                    userId
                                                ) ? (
                                                    <span>Disabled</span>
                                                ) : (
                                                    <>
                                                        <button
                                                            className="mr-1"
                                                            onClick={() =>
                                                                navigate(
                                                                    `/edit-project/${project._id}`
                                                                )
                                                            }
                                                        >
                                                            <BiEdit
                                                                size={22}
                                                                color="blue"
                                                            />
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                showDeleteModal(
                                                                    true
                                                                );
                                                                setDeleteCategoryId(
                                                                    project._id
                                                                );
                                                            }}
                                                            className="mr-1"
                                                        >
                                                            <AiFillDelete
                                                                size={22}
                                                                color="red"
                                                            />
                                                        </button>
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                    </tbody>
                </table>
                <div className="flex justify-end">
                    {projectDetails.length > 0 && (
                        <nav aria-label="Page navigation example">
                            <ul className="flex items-center -space-x-px h-8 text-sm">
                                {page !== 1 && (
                                    <li
                                        onClick={() =>
                                            selectPageHandler(page - 1)
                                        }
                                    >
                                        <a
                                            href="#"
                                            className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 "
                                        >
                                            <span className="sr-only">
                                                Previous
                                            </span>
                                            <svg
                                                className="w-2.5 h-2.5"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 6 10"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M5 1 1 5l4 4"
                                                />
                                            </svg>
                                        </a>
                                    </li>
                                )}

                                {[
                                    ...Array(
                                        Math.ceil(projectDetails.length / 5)
                                    ),
                                ].map((_, index) => {
                                    return (
                                        <li
                                            key={index}
                                            onClick={() =>
                                                selectPageHandler(index + 1)
                                            }
                                        >
                                            <a
                                                href="#"
                                                className={page == index + 1 ? "flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 bg-gray-300" : "flex items-center justify-center px-3 h-8 leading-tight border border-gray-300"}
                                            >
                                                {index + 1}
                                            </a>
                                        </li>
                                    );
                                })}
                                <li onClick={() => selectPageHandler(page + 1)}>
                                    <a
                                        href="#"
                                        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
                                    >
                                        <span className="sr-only">Next</span>
                                        <svg
                                            className="w-2.5 h-2.5"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 6 10"
                                        >
                                            <path
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="m1 9 4-4-4-4"
                                            />
                                        </svg>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    )}
                </div>
            </div>
            <Modal
                isVisible={deleteModal}
                onClose={() => showDeleteModal(false)}
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
                            onClick={projectDelete}
                            className="bg-sky-500 py-2 px-4 border-gray border-opacity-30 text-white font-light text-xl rounded-lg border-4 mr-2"
                        >
                            Yes, delete it!
                        </button>
                        <button
                            onClick={() => showDeleteModal(false)}
                            className="bg-red-600 py-2 px-4 border-gray border-opacity-30 text-white font-light text-xl rounded-lg border-4 ml-2"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ManageProjectTable;
