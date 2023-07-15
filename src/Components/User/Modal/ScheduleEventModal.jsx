import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createEvent } from "../../../Services/userApi";
import { useSelector } from "react-redux";

export const ScheduleEventModal = ({ slotInfo, onClose, getData }) => {
    const [startDateTime, setStartDateTime] = useState("");
    const [endDateTime, setEndDateTime] = useState("");
    const [color, setColor] = useState("#2464f9");
    const [title, setTitle] = useState("");
    const { userId } = useSelector((state) => state.user)

    const handleSubmit = () => {
        const value = {
            title: title,
            start: startDateTime,
            end: endDateTime,
            color: color,
            userId: userId,
        };
        createEvent(value)
            .then((res) => {
                onClose()
                getData()
            })
            .catch((error) => {});
    };

    useEffect(() => {
        // create a date object from the timestamp
        const startDate = new Date(slotInfo.start);
        const endDate = new Date(slotInfo.end);

        // Get the individula components of the date and time
        // Start date and time
        const startYear = startDate.getFullYear();
        const startMonth = String(startDate.getMonth() + 1).padStart(2, "0"); // Months are zerobased, so add 1
        const startDay = String(startDate.getDate()).padStart(2, "0");
        const startHours = String(startDate.getHours()).padStart(2, "0");
        const startMinutes = String(startDate.getMinutes()).padStart(2, "0");
        const formattedStartDateTime = `${startYear}-${startMonth}-${startDay}T${startHours}:${startMinutes}`;
        setStartDateTime(formattedStartDateTime);

        // end date and time
        const endYear = endDate.getFullYear();
        const endMonth = String(endDate.getMonth() + 1).padStart(2, "0"); // Moth are zero based , so add 1
        const endDay = String(endDate.getDate()).padStart(2, "0");
        const endHour = String(endDate.getHours()).padStart(2, "0");
        const endMinutes = String(endDate.getMinutes()).padStart(2, "0");
        const formattedEndDateTime = `${endYear}-${endMonth}-${endDay}T${endHour}:${endMinutes}`;
        setEndDateTime(formattedEndDateTime);
    }, []);

    return (
        <>
            <div className="w-[500px] p-5">
                <div className="relative z-0 w-full mb-6 group">
                    <input
                        type="text"
                        name="floating_add_event"
                        id="floating_add_event"
                        className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer text-3xl"
                        placeholder="Add title "
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="flex items-center mb-3">
                    <h1 className="font-medium text-xl mr-5 w-12">From</h1>
                    <input
                        type="datetime-local"
                        className="mx-2"
                        value={startDateTime}
                        onChange={(e) => setStartDateTime(e.target.value)}
                        min={new Date().toISOString().slice(0, 16)}
                    />
                </div>
                <div className="flex items-center mb-3">
                    <h1 className="font-medium text-xl mr-5 w-12">To</h1>
                    <input
                        type="datetime-local"
                        className="mx-2"
                        value={endDateTime}
                        onChange={(e) => setEndDateTime(e.target.value)}
                        min={new Date().toISOString().slice(0, 16)}
                    />
                </div>
                <div>
                    <input
                        type="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        className="px-4 py-1 ml-2 font-medium rounded-sm hover:bg-gray-300"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-1 bg-blue-600 ml-2 font-medium text-white rounded-sm hover:bg-blue-700"
                        onClick={() => handleSubmit()}
                    >
                        Save
                    </button>
                </div>
            </div>
        </>
    );
};
