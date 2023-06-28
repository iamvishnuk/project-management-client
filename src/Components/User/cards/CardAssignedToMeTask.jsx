import { RiTaskFill } from "react-icons/ri";
import { FaBug } from "react-icons/fa";

export const CardAssignedToMeTask = ({ assignedTask }) => {
    return (
        <>
            <div className="mt-5">
                {assignedTask && // Check if assignedTask is defined
                    assignedTask.map((value, index) => {
                        return (
                            <div key={index}>
                                <h1 className="mb-2">
                                    {value && value.boardName}{" "}
                                </h1>
                                <div className="grid gap-2">
                                    {assignedTask &&
                                        value.task.map((item, innerIndex) => {
                                            // Renamed index to innerIndex
                                            return (
                                                <div
                                                    className="h-14 rounded-md bg-gray-100 flex items-center px-2 hover:bg-gray-200"
                                                    key={innerIndex}
                                                >
                                                    {item.taskType ===
                                                        "New task" && (
                                                        <RiTaskFill
                                                            color="blue"
                                                            size={25}
                                                        />
                                                    )}
                                                    {item.taskType ===
                                                        "Bug" && (
                                                        <FaBug
                                                            color="red"
                                                            size={25}
                                                        />
                                                    )}
                                                    <h1 className="ml-2">
                                                        {item &&
                                                            item.shortSummary}
                                                    </h1>
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>
                        );
                    })}
            </div>
        </>
    );
};
