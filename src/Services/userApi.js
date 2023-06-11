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
    return userAxiosInstance.get(`/forgot-password/${email}`,{withCredentials: true})
}

const verifyChangePasswordUrl = (id, token) => {
    return userAxiosInstance.get(`/change-password/${id}/verify/${token}`,{withCredentials: true})
}

const forgotPassword = (id, value) => {
    return userAxiosInstance.post(`/change-password/${id}`,value,{withCredentials: true})
}


// api related to project category

export {
    userRegisteration,
    signupWithGoogle,
    userLogin,
    loginWithGoogle,
    emailVerification,
    forgotPasswordSendEmail,
    verifyChangePasswordUrl,
    forgotPassword
}