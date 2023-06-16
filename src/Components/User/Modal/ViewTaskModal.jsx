import React, { useState } from "react";
import { RiDeleteBin6Line, RiTaskFill } from "react-icons/ri";
import Select from "react-select";
import {
    MdKeyboardDoubleArrowUp,
    MdKeyboardArrowUp,
    MdKeyboardArrowDown,
    MdKeyboardDoubleArrowDown,
} from "react-icons/md";

export const ViewTaskModal = () => {
    const [status, setStatus] = useState("todo")
    return (
        <>
            <div className="overflow-auto p-2">
                <div className="w-[1000px] ">
                    <div className="flex justify-between items-center ">
                        <div>
                            <span className="hover:bg-gray-100 py-1 px-3 rounded-md flex items-center">
                                <RiTaskFill color="blue" size={20} />
                                Issue type
                            </span>
                        </div>
                        <div>
                            <RiDeleteBin6Line size={20} color="gray" />
                        </div>
                    </div>
                    <div className="flex p-3">
                        <div className="w-4/6 p-1">
                            <div className="mb-3">
                                <h1 className="font-medium text-2xl hover:bg-gray-200 p-1">
                                    Try dragging issues to different columns to
                                    transition their status.
                                </h1>
                            </div>
                            <div className="mb-3">
                                <h1 className="font-medium mb-2">
                                    Description
                                </h1>
                                <div className="text-gray-700">
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur,
                                        adipisicing elit. Labore impedit dolor
                                        magni cumque! Libero nostrum expedita,
                                        repudiandae temporibus, harum, quaerat
                                        eum nisi ex dolorum at obcaecati sunt
                                        impedit dignissimos dolores! Lorem ipsum
                                        dolor sit amet consectetur adipisicing
                                        elit. Sint voluptatem numquam amet
                                        tenetur voluptas minima cupiditate vitae
                                        esse, doloribus nostrum dolor molestias
                                        dolore natus nulla expedita, explicabo
                                        iusto sit. Mollitia aspernatur, officiis
                                        dolorem amet, distinctio laboriosam
                                        voluptatibus beatae ex tempore ipsam
                                        voluptas!{" "}
                                    </p>
                                </div>
                            </div>
                            <div className="py-3">
                                <h1 className="mb-2 font-medium">Comments</h1>
                                <div className="flex p-2">
                                    <div className="m-1">
                                        <div className="w-[40px] h-[40px] bg-green-600 rounded-full"></div>
                                    </div>
                                    <div className="flex-grow">
                                        <textarea
                                            rows={3}
                                            className="w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Write your comments..."
                                        ></textarea>
                                        <button className="py-1 px-3 rounded-sm bg-blue-700 text-white hover:bg-blue-600 mr-2">
                                            save
                                        </button>
                                        <button className="py-1 px-3 rounded-sm hover:bg-gray-200">
                                            cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-3/6 p-1">
                            <div className="mb-5">
                                <h1 className="font-medium text-sm text-gray-500 mb-1">
                                    STATUS
                                </h1>
                                <Select />
                            </div>
                            <div className="mb-5">
                                <h1 className="font-medium text-sm text-gray-500 mb-1">
                                    ASSIGNEE
                                </h1>
                                <Select />
                            </div>
                            <div className="mb-5">
                                <h1 className="font-medium text-sm text-gray-500 mb-1">
                                    PRIORITY
                                </h1>
                                <div className="flex items-center">
                                    <MdKeyboardDoubleArrowUp size={20} color="red" /><span>Highest</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
