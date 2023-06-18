import { useEffect, useState } from "react";
import Board from "../Components/User/Board/Board";
import AddNewBoard from "../Components/User/Board/AddNewBoard";
import { getBoardData } from "../Services/boardApi";
import { useSelector } from "react-redux";

const BoardPage = () => {
    const [boardData, setBoardData] = useState(null);
    const { _id } = useSelector((state) => state.project.value);

    // for getting the board data of the perticular project
    const getData = () => {
        getBoardData(_id)
            .then((res) => {
                setBoardData(res.data.boardData);
            })
            .catch((error) => console.log(error.message));
    };

    useEffect(() => {
        getData();
    }, []);

    console.log(boardData);

    return (
        <>
            <div className="overflow-x-auto h-full scrollbar-hide">
                <div className="flex gap-3 min-w-fit">
                    {boardData &&
                        boardData.map((data, index) => (
                            <Board key={index} data={data} index={index} getData={getData} />
                        ))}
                    <AddNewBoard getData={getData} />
                </div>
            </div>
        </>
    );
};

export default BoardPage;
