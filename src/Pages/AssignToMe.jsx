import { getAssignedTask } from "../Services/userApi";
import { CardAssignedToMeTask } from "../Components/User/cards/CardAssignedToMeTask";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";

export const AssignToMe = () => {
    const [assignedTask, setAssignedTask] = useState([]);
    const { _id } = useSelector((state) => state.project.value);
    // getting the assigned task
    useEffect(() => {
        getAssignedTask(_id).then((res) => {
            setAssignedTask(res.data.assignedTask);
        });
    }, []);
    return (
        <>
            <h1 className="font-medium text-2xl">Assigned To Me</h1>
            <div>
                <div>
                    <CardAssignedToMeTask assignedTask={assignedTask} />
                </div>
            </div>
        </>
    );
};
