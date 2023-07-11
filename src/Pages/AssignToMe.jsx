import { getAssignedTask } from "../Services/userApi";
import { CardAssignedToMeTask } from "../Components/User/cards/CardAssignedToMeTask";
import { useEffect } from "react";
import { useState } from "react";

export default function AssignToMe() {
    const [assignedTask, setAssignedTask] = useState([]);
    // getting the assigned task
    useEffect(() => {
        getAssignedTask().then((res) => {
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
}
