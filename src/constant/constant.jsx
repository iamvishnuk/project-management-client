import {
    MdKeyboardDoubleArrowUp,
    MdKeyboardArrowUp,
    MdKeyboardArrowDown,
    MdKeyboardDoubleArrowDown,
} from "react-icons/md";
import { RiTaskFill } from "react-icons/ri";
import { FaBug } from "react-icons/fa";

// task priorityOptions
export const priorityOptions = [
    {
        value: "Highest",
        label: "Highest",
        icon: <MdKeyboardDoubleArrowUp color="red" size={20} />,
    },
    {
        value: "High",
        label: "High",
        icon: <MdKeyboardArrowUp color="red" size={20} />,
    },
    {
        value: "Low",
        label: "Low",
        icon: <MdKeyboardArrowDown color="green" size={20} />,
    },
    {
        value: "Lowest",
        label: "Lowest",
        icon: <MdKeyboardDoubleArrowDown color="green" size={20} />,
    },
];

// task type
export const taskTypeOpions = [
    {
        value: "New task",
        label: "New task",
        icon: <RiTaskFill color="blue" size={20} />,
    },
    { 
        value: "Bug", 
        label: "Bug", 
        icon: <FaBug color="red" size={20} /> 
    },
];

export const NotificaitonIcon = "public/Images/idea.png";
