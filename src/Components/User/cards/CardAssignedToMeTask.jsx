import { RiTaskFill } from "react-icons/ri";
import { FaBug } from "react-icons/fa";

export const CardAssignedToMeTask = ({ assignedTask }) => {
    return (
        <>
            <div className="mt-5">
                {assignedTask &&
                    assignedTask.map((boardGroup, index) => (
                        <div key={index}>
                            <h2 className="uppercase font-medium my-4">
                                {boardGroup[0]?.projectId &&
                                    boardGroup[0]?.projectId.projectName}
                            </h2>
                            {/* Render other project details */}
                            {boardGroup.map((board) => (
                                <div key={board._id} className="ml-5">
                                    <h3 className="font-medium uppercase mb-2">
                                        {board.boardName}
                                    </h3>
                                    {/* Render other board details */}
                                    <ul className="ml-2 grid gap-2">
                                        {board.task.map((task) => (
                                            <li key={task._id} className="flex gap-2 bg-gray-100 p-2 hover:bg-gray-200">
                                                    {task.taskType ===
                                                        "New task" && (
                                                        <RiTaskFill
                                                            color="blue"
                                                            size={25}
                                                        />
                                                    )}
                                                    {task.taskType ===
                                                        "Bug" && (
                                                        <FaBug
                                                            color="red"
                                                            size={25}
                                                        />
                                                    )}
                                                <p>
                                                    {task.shortSummary}
                                                </p>
                                                {/* Render other task details */}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    ))}
            </div>
        </>
    );
};
