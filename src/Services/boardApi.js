import { userAxiosInstance } from "../axios/AxiosInstance";

const createBoard = (value) => {
    return userAxiosInstance.post("/create-board", value, { withCredentials: true })
}

const getBoardData = (projectId) => {
    return userAxiosInstance.get(`/get-board-data/${projectId}`, { withCredentials: true })
}

const deleteBoard = (boardId) => {
    return userAxiosInstance.get(`/delete-board/${boardId}`, { withCredentials: true })
}

const createNewTask = (boardId, projectId, values) => {
    return userAxiosInstance.post(`/create-new-task/${projectId}/${boardId}`, values, { withCredentials: true })
}

export {
    createBoard,
    getBoardData,
    deleteBoard,
    createNewTask
}