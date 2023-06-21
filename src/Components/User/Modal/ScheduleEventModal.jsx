import React from "react";

export const ScheduleEventModal = () => {
    return (
        <>
            <div className="w-[500px] p-5">
                <div class="relative z-0 w-full mb-6 group">
                    <input
                        type="text"
                        name="floating_add_event"
                        id="floating_add_event"
                        className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer text-3xl"
                        placeholder="Add title "
                        required
                    />
                </div>
                <div className="flex items-center mb-3">
                    <h1 className="font-medium text-xl mr-5 w-12">From</h1>
                    <input type="date" className="mx-2" />
                    <input type="time" className="mx-2" />
                </div>
                <div className="flex items-center mb-3">
                    <h1 className="font-medium text-xl mr-5 w-12">To</h1>
                    <input type="date" className="mx-2" />
                    <input type="time" className="mx-2" />
                </div>
                <div className="flex justify-end">
                    <button className="px-4 py-1 ml-2 font-medium rounded-sm hover:bg-gray-300">Cancel</button>
                    <button className="px-4 py-1 bg-blue-600 ml-2 font-medium text-white rounded-sm hover:bg-blue-700">Save</button>
                </div>
            </div>
        </>
    );
};
