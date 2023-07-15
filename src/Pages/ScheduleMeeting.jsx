import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import Modal from "../Components/User/Modal/Modal";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
import { ScheduleEventModal } from "../Components/User/Modal/ScheduleEventModal";
import { useEffect } from "react";
import { getEvent } from "../Services/userApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const localizer = momentLocalizer(moment);

export default function ScheduleMeeting() {
    const [addEventModal, showAddEventModal] = useState(false);
    const [slotData, setSlotData] = useState(null);
    const [event, setEvent] = useState([]);
    const { userId } = useSelector((state) => state.user);

    const eventDetails = event.map((event) => {
        return {
            start: moment(event.start).toDate(),
            end: moment(event.end).toDate(),
            title: event.title,
            color: event.color,
            id: event._id,
        };
    });

    // for custom styling
    const eventStyleGetter = (event) => {
        const style = {
            backgroundColor: event.color,
            borderRadius: "5px",
            opacity: 0.8,
            color: "white",
            border: "none",
            display: "block",
        };
        return {
            style,
        };
    };

    // for setting the clicked time and date for create event
    const handleAddEvent = (slotInfo) => {
        setSlotData(slotInfo);
    };

    // for getting the all events
    const fecthData = () => {
        getEvent(userId)
            .then((res) => {
                setEvent(res.data.eventData);
            })
            .catch((error) => {});
    };

    useEffect(() => {
        fecthData();
    }, []);

    return (
        <>
            <div className="App">
                <Calendar
                    localizer={localizer}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: "87vh" }}
                    defaultView="week"
                    selectable={true}
                    events={eventDetails}
                    onSelectSlot={(slotInfo) => {
                        const startDate = new Date(slotInfo.start)
                        const currentDate = new Date()
                        console.log(startDate, currentDate)
                        if(startDate >= currentDate) {
                            handleAddEvent(slotInfo);
                            showAddEventModal(true);
                        } else {
                            toast.error("Can't select previous date")
                        }
                    }}
                    eventPropGetter={eventStyleGetter}
                />
            </div>
            {/* Modal for adding new meeting or events */}
            <Modal
                isVisible={addEventModal}
                onClose={() => showAddEventModal(false)}
            >
                <ScheduleEventModal
                    slotInfo={slotData}
                    onClose={() => showAddEventModal(false)}
                    getData={fecthData}
                />
            </Modal>
        </>
    );
}
