import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import Modal from "../Components/User/Modal/Modal";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
import { ScheduleEventModal } from "../Components/User/Modal/ScheduleEventModal";

const localizer = momentLocalizer(moment);

export default function ScheduleMeeting() {
    const [addEventModal, showAddEventModal] = useState(false);
    const [eventData, setEventData] = useState(null);
    const handleAddEvent = (slotInfo) => {
        console.log("start Date :", slotInfo.start);
        console.log("end Date :", slotInfo.end);
    };
    return (
        <>
            <div className="App">
                <Calendar
                    localizer={localizer}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: "87vh" }}
                    selectable={true}
                    onSelectSlot={(slotInfo) => {
                        handleAddEvent(slotInfo);
                        showAddEventModal(true);
                    }}
                />
            </div>
            <Modal
                isVisible={addEventModal}
                onClose={() => showAddEventModal(false)}
            >
                <ScheduleEventModal />
            </Modal>
        </>
    );
}
