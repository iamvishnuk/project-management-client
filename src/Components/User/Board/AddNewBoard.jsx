import { useState } from "react";
import { BsCheckLg } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { AiOutlinePlus } from "react-icons/ai";
import { createBoard } from "../../../Services/boardApi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export default function AddNewBoard({getData}) {
    const [add, setAdd] = useState(false);
    const [boardName, setBoardName] = useState("");
    const { _id } = useSelector((state) => state.project.value);

    const boardCreate = () => {
        createBoard({ boardName: boardName, projectId: _id })
            .then((res) => {
                setAdd(false);
                getData()
                toast.success(res.data.message);
            })
            .catch((error) => toast.error(error.response.data.message));
    };

    return (
        <>
            {add ? (
                <div className=" border-gray-200 h-[98px] p-1">
                    <div>
                        <input
                            className="w-72 border-gray-200"
                            type="text"
                            placeholder="Name of the borad"
                            value={boardName}
                            onChange={(e) => setBoardName(e.target.value)}
                        />
                    </div>
                    <button
                        className="p-2 rounded-md hover:bg-gray-100 mt-2 border-2 shadow-lg"
                        onClick={boardCreate}
                    >
                        <BsCheckLg size={20} />
                    </button>
                    <button
                        className="p-2 rounded-md hover:bg-gray-100 mt-2 border-2 shadow-lg"
                        onClick={() => setAdd(false)}
                    >
                        <RxCross2 size={20} />
                    </button>
                </div>
            ) : (
                <div
                    className="p-3 border-2 h-[53px] bg-gray-100 rounded-md hover:cursor-pointer hover:shadow-xl"
                    onClick={() => setAdd(true)}
                >
                    <AiOutlinePlus size={25} />
                </div>
            )}
        </>
    );
}
