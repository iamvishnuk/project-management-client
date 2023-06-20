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

const dragAndDropTask = (value) => {
    return userAxiosInstance.post("/drag-drop-task", value, { withCredentials: true })
}

const editTask = (value) => {
    return userAxiosInstance.post("/edit-task", value, { withCredentials: true })
}

const getBoardNames = () => {
    return userAxiosInstance.get("/get-board-names", { withCredentials: true })
}

const editChangeBoard = (value) => {
    return userAxiosInstance.post("/change-board", value, { withCredentials: true })
}

const addComment = (value) => {
    return userAxiosInstance.post("/add-comment", value, { withCredentials: true })
}

const deleteTask = (boardName, taskId) => {
    return userAxiosInstance.get(`/delete-board/${boardName}/${taskId}`, { withCredentials: true })
}

export {
    createBoard,
    getBoardData,
    deleteBoard,
    createNewTask,
    dragAndDropTask,
    editTask,
    getBoardNames,
    editChangeBoard,
    addComment,
    deleteTask
}