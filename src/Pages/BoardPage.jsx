import { useEffect, useState } from "react";
import Board from "../Components/User/Board/Board";
import AddNewBoard from "../Components/User/Board/AddNewBoard";
import { getBoardData, dragAndDropTask } from "../Services/boardApi";
import { useSelector } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";

const BoardPage = () => {
    const [boardData, setBoardData] = useState(null);
    const { _id } = useSelector((state) => state.project.value);

    // for getting the board data of the perticular project
    const getData = () => {
        getBoardData(_id)
            .then((res) => {
                console.log(res.data.boardData)
                setBoardData(res.data.boardData);
            })
            .catch((error) => console.log(error.message));
    };

    useEffect(() => {
        getData();
    }, []);

    // handling the darg and drop of cards
    const handleDragEnd = ({ destination, source }) => {
        console.log("destination:", destination, "source:", source);
        if (destination.droppableId === source.droppableId) return;
        dragAndDropTask({ destination: destination, source: source })
            .then((res) => {
                console.log(res);
                getData();
            })
            .catch((error) => console.log(error));
    };

    return (
        <>
            <div className="overflow-x-auto h-full scrollbar-hide">
                <DragDropContext onDragEnd={handleDragEnd}>
                    <div className="flex gap-3 min-w-fit">
                        {boardData &&
                            boardData.map((data, index) => (
                                <Board
                                    key={index}
                                    data={data}
                                    index={index}
                                    getData={getData}
                                />
                            ))}
                        <AddNewBoard getData={getData} />
                    </div>
                </DragDropContext>
            </div>
        </>
    );
};

export default BoardPage;
