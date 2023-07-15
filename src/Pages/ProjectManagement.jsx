import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import ManageProjectTable from "../Components/User/Table/ManageProjectTable";
import { useNavigate } from "react-router";
import { getAllProjectDetail } from "../Services/userApi";

const ProjectManagement = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [projectDetails, setProjectDetails] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [page, setPage] = useState(1)

    const getData = () => {
        let skip = page * 5 - 5
        getAllProjectDetail(5,skip).then((res) => {
            setProjectDetails(res.data.projectDetails);
            setTotalPage(res.data.totalPage);
        });
    };

    // for handling the pagenation
    const selectPageHandler = (selectPage) => {
        setPage(selectPage)
    }

    useEffect(() => {
        getData();
    }, [page]);

    return (
        <>
            <div className="">
                <h1 className="text-2xl font-bold">Project Mangement</h1>
                <div className="mt-3 mb-3 flex justify-between">
                    <input
                        className="rounded-md h-10 w-2/6 border-2 border-gray-500"
                        type="text"
                        placeholder="Search....."
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button
                        onClick={() => navigate("/create-project")}
                        className="bg-btn-green text-white font-medium px-3 py-1 rounded-md flex items-center"
                    >
                        <FaPlus className="mr-1" />
                        Create project
                    </button>
                </div>
            </div>
            <ManageProjectTable
                projectDetails={projectDetails}
                getData={getData}
                search={search}
            />
            {/* Pagination */}
            <div className="flex justify-end">
                {totalPage > 0 && (
                    <nav aria-label="Page navigation example">
                        <ul className="flex items-center -space-x-px h-8 text-sm">
                            {page !== 1 && (
                                <li onClick={() => selectPageHandler(page - 1)}>
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
                                                strokeWidth="2"
                                                d="M5 1 1 5l4 4"
                                            />
                                        </svg>
                                    </a>
                                </li>
                            )}

                            {[...Array(Math.ceil(totalPage / 5))].map(
                                (_, index) => {
                                    return (
                                        <li
                                            key={index}
                                            onClick={() =>
                                                selectPageHandler(index + 1)
                                            }
                                        >
                                            <a
                                                href="#"
                                                className={
                                                    page == index + 1
                                                        ? "flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 bg-gray-300"
                                                        : "flex items-center justify-center px-3 h-8 leading-tight border border-gray-300"
                                                }
                                            >
                                                {index + 1}
                                            </a>
                                        </li>
                                    );
                                }
                            )}
                            {5 * page < totalPage && (
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
                                                strokeWidth="2"
                                                d="m1 9 4-4-4-4"
                                            />
                                        </svg>
                                    </a>
                                </li>
                            )}
                        </ul>
                    </nav>
                )}
            </div>
        </>
    );
};

export default ProjectManagement;
