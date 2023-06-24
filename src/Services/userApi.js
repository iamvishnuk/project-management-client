import { userAxiosInstance } from "../axios/AxiosInstance";

// ----------------- Api related to users ----------------------------------- 
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

const getUserProfile = (userId) => {
    return userAxiosInstance.get(`/get-user-details/${userId}`, { withCredentials: true })
}

const editUserDetails = (values) => {
    return userAxiosInstance.post("/edite-user-details", values, { withCredentials: true })
}

const uploadImage = (value) => {
    return userAxiosInstance.post("/image-upload", value, { headers: { "content-type": "multipart/form-data", },withCredentials:true})
}

// ----------------- end of api related to user -------------------------------


// ---------------- api related to project category ---------------------------
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
// ------------------ end of api related to project category -------------------------


// ------------------ api related to team management ---------------------------------
const getAllPeople = () => {
    return userAxiosInstance.get("/get-all-people", { withCredentials: true })
}

const sendInviteMail = (email) => {
    return userAxiosInstance.post("/send-invite-mail", email, { withCredentials: true })
}

const createTeam = (data) => {
    return userAxiosInstance.post("/create-team", data, { withCredentials: true })
}

const getAllTeam = () => {
    return userAxiosInstance.get("/get-team", { withCredentials: true })
}

const removePeople = (id) => {
    return userAxiosInstance.get(`/remove-people/${id}`, { withCredentials: true })
}

const getSingleTeam = (id) => {
    return userAxiosInstance.get(`/get-single-team/${id}`, { withCredentials: true })
}

const removeTeamMember = (teamId, memberId) => {
    return userAxiosInstance.get(`/remove-team-member/${teamId}/${memberId}`, { withCredentials: true })
}

const addTeamMember = (teamId, member) => {
    return userAxiosInstance.post(`/add-team-memeber/${teamId}`, member, { withCredentials: true })
}

const deleteTeam = (teamId) => {
    return userAxiosInstance.get(`/delete-team/${teamId}`, { withCredentials: true })
}

// ------------------- end of api related to team management --------------------


// -------------------- apit related to project management -----------------------
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
    return userAxiosInstance.get(`/get-access-member-list/${projectId}`, { withCredentials: true })
}

const removeAcess = (memberId, projectId) => {
    return userAxiosInstance.get(`/remove-access/${memberId}/${projectId}`, { withCredentials: true })
}

const getAssignedTask = (projectId) => {
    return userAxiosInstance.get(`/get-assigned-task/${projectId}`, { withCredentials: true })
}

// ------------------------ API RELATED TO SCHEDULE MEETINGS -----------------------    
const createEvent = (value) => {
    return userAxiosInstance.post("/create-event", value, { withCredentials: true })
}

const getEvent = (userId) => {
    return userAxiosInstance.get(`/get-events/${userId}`, { withCredentials: true })
}
// -------------------- END OF API RELATED TO SCHEDULE MEETING ---------------------- 


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
    removeAcess,
    createTeam,
    getAllTeam,
    removePeople,
    getSingleTeam,
    removeTeamMember,
    addTeamMember,
    deleteTeam,
    createEvent,
    getEvent,
    getUserProfile,
    editUserDetails,
    uploadImage,
    getAssignedTask,
}