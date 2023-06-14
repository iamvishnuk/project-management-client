import { userAxiosInstance } from "../axios/AxiosInstance";

// Api related to users 
const userRegisteration = (value) => {
    return userAxiosInstance.post("/signup", value, { withCredentials: true })
}

const signupWithGoogle = (value) => {
    return userAxiosInstance.post("/google-signup", value, { withCredentials: true })
}

const userLogin = (value) => {
    return userAxiosInstance.post("/", value, { withCredentials: true })
}

const loginWithGoogle = (value) => {
    return userAxiosInstance.post("/google-login", value, { withCredentials: true })
}

const emailVerification = (id, token) => {
    return userAxiosInstance.get(`/user/${id}/verify/${token}`, { withCredentials: true })
}

const forgotPasswordSendEmail = (email) => {
    return userAxiosInstance.get(`/forgot-password/${email}`, { withCredentials: true })
}

const verifyChangePasswordUrl = (id, token) => {
    return userAxiosInstance.get(`/change-password/${id}/verify/${token}`, { withCredentials: true })
}

const forgotPassword = (id, value) => {
    return userAxiosInstance.post(`/change-password/${id}`, value, { withCredentials: true })
}

const isAuthUser = () => {
    return userAxiosInstance.get("/is-auth-user", { withCredentials: true })
}


// api related to project category
const getCategory = () => {
    return userAxiosInstance.get('/get-category-data', { withCredentials: true })
}

const createCategory = (value) => {
    return userAxiosInstance.post("/create-category", value, { withCredentials: true })
}

const editCategory = (value) => {
    return userAxiosInstance.post("/edit-category", value, { withCredentials: true })
}
const deleteCategory = (id) => {
    return userAxiosInstance.get(`/delete-category/${id}`, { withCredentials: true })
}

// api related to team management
const getAllPeople = () => {
    return userAxiosInstance.get("/get-all-people", { withCredentials: true })
}

const sendInviteMail = (email) => {
    return userAxiosInstance.post("/send-invite-mail", email, { withCredentials: true })
}

// apit related to project management
const getMembersAndCategory = () => {
    return userAxiosInstance.get("/get-member-and-category", { withCredentials: true })
}

const createProject = (values) => {
    return userAxiosInstance.post("/create-project", values, { withCredentials: true })
}

const getAllProjectDetail = () => {
    return userAxiosInstance.get("/get-all-project", { withCredentials: true })
}

const deleteProject = (id) => {
    return userAxiosInstance.get(`/delete-project/${id}`, { withCredentials: true })
}

const getEditProjectDetails = (id) => {
    return userAxiosInstance.get(`/get-edit-project-details/${id}`, { withCredentials: true })
}

const editProject = (values) => {
    return userAxiosInstance.post("/edit-project", values, { withCredentials: true })
}

const getMembers = () => {
    return userAxiosInstance.get("/get-member", { withCredentials: true })
}

const giveAccessToProject = (id, value) => {
    return userAxiosInstance.post(`/give-access/${id}`, value, { withCredentials: true })
}

const getAccessMembersList = (projectId) => {
    return userAxiosInstance.get(`/get-access-member-list/${projectId}`,{withCredentials: true})
}

const removeAcess = (memberId, projectId) => {
    return userAxiosInstance.get(`/remove-access/${memberId}/${projectId}`,{withCredentials: true})
}

export {
    userRegisteration,
    signupWithGoogle,
    userLogin,
    loginWithGoogle,
    emailVerification,
    forgotPasswordSendEmail,
    verifyChangePasswordUrl,
    forgotPassword,
    isAuthUser,
    getCategory,
    createCategory,
    editCategory,
    deleteCategory,
    getAllPeople,
    sendInviteMail,
    getMembersAndCategory,
    createProject,
    getAllProjectDetail,
    deleteProject,
    getEditProjectDetails,
    editProject,
    getMembers,
    giveAccessToProject,
    getAccessMembersList,
    removeAcess
}