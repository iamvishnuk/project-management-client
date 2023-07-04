import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const [open, setOpen] = useState(true);
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("userToken");
        navigate("/");
    };
    return (
        <>
            <div
                className={`${
                    open ? "72" : "w-20"
                } p-5 pt-8 duration-300 h-screen bg-gray-100 relative border-r-2`}
            >
                <img
                    onClick={() => setOpen(!open)}
                    src="../../../public/images/control.png"
                    alt=""
                    className={`absolute cursor-pointer rounded-full -right-3 top-9 w-7 border-2 border-dark-purple ${
                        !open && "rotate-180"
                    }`}
                />
                <div className="flex gap-4 items-center">
                    <img
                        src="../../../public/images/logo.png"
                        alt=""
                        className={`cursor-pointer duration-500`}
                    />
                    <h1
                        className={`text-black origin-left font-medium text-xl duration-300 ${
                            !open && "scale-0"
                        }`}
                    >
                        ProjectFlow
                    </h1>
                </div>
                <hr className="mt-5" />
                <ul className="pt-6 text-black font-medium">
                    <li
                        onClick={() => navigate("/project-management")}
                        className="mt-2  text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-blue-700 hover:text-white rounded-md"
                    >
                        <div className="w-6 flext justify-center">
                            <i className="fa-solid fa-gear  text-xl"></i>
                        </div>
                        <span
                            className={`${
                                !open && "hidden"
                            } orign-left duration-200`}
                        >
                            Project Management
                        </span>
                    </li>
                    <li
                        onClick={() => navigate("/manage-category")}
                        className="mt-2  text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-blue-700 hover:text-white rounded-md"
                    >
                        <div className="w-6 flex justify-center">
                            <i className="fa-regular fa-file text-xl"></i>
                        </div>
                        <span
                            className={`${
                                !open && "hidden"
                            } orign-left duration-200`}
                        >
                            Category Management
                        </span>
                    </li>
                    <li
                        className="mt-2  text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-blue-700 hover:text-white rounded-md"
                        onClick={() => navigate(`/assinged-to-me`)}
                    >
                        <div className="w-6 flext justify-center">
                            <i className="fa-solid fa-user-pen text-xl"></i>
                        </div>
                        <span
                            className={`${
                                !open && "hidden"
                            } orign-left duration-200`}
                        >
                            Assigned To Me
                        </span>
                    </li>
                    <li
                        onClick={() => navigate("/manage-team")}
                        className="mt-2  text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-blue-700 hover:text-white rounded-md"
                    >
                        <div className="w-6 flex justify-center">
                            <i className="fa-solid fa-people-group text-xl"></i>
                        </div>
                        <span
                            className={`${
                                !open && "hidden"
                            } orign-left duration-200`}
                        >
                            Team
                        </span>
                    </li>
                    <li
                        onClick={() => navigate("/schedule-meeting")}
                        className="mt-2  text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-blue-700 hover:text-white rounded-md"
                    >
                        <div className="w-6 flex justify-center">
                            <i className="fa-solid fa-calendar-plus text-xl"></i>
                        </div>
                        <span
                            className={`${
                                !open && "hidden"
                            } orign-left duration-200`}
                        >
                            Schedule Meeting
                        </span>
                    </li>
                    <li
                        onClick={() => navigate("/create-meeting")}
                        className="mt-2  text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-blue-700 hover:text-white rounded-md"
                    >
                        <div className="w-6 flex justify-center">
                            <i className="fa-solid fa-video text-lg"></i>
                        </div>
                        <span
                            className={`${
                                !open && "hidden"
                            } orign-left duration-200`}
                        >
                            Create Meeting
                        </span>
                    </li>
                    <li
                        onClick={() => navigate("/user-profile")}
                        className="mt-2  text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-blue-700 hover:text-white rounded-md"
                    >
                        <div className="w-6 flex justify-center">
                            <i className="fa-solid fa-user text-xl"></i>
                        </div>
                        <span
                            className={`${
                                !open && "hidden"
                            } orign-left duration-200`}
                        >
                            Profile
                        </span>
                    </li>
                    <li
                        onClick={logout}
                        className="mt-2  text-sm flex items-center gap-x-4 cursor-pointer p-2 text-red-500 hover:bg-red-600 hover:text-white rounded-md"
                    >
                        <div className="w-6 flex justify-center">
                            <i className="fa-solid fa-right-from-bracket text-xl"></i>
                        </div>
                        <span
                            className={`${
                                !open && "hidden"
                            } orign-left duration-200`}
                        >
                            Logout
                        </span>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Sidebar;
