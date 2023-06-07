import axios from "axios";
const baseURL = import.meta.env.VITE_REACT_APP_BASE_URL;

const createAxiosClient = (baseURL) => {
    const client = axios.create({
        baseURL,
        timeout: 5000,
        timeoutErrorMessage: "Request timeout... Please Try Again",
    });
    return client
};

const attackToken = (req, tokenName) => {
    let authToken = localStorage.getItem(tokenName);
    if (authToken) {
        req.headers.Authorization = `Bearer ${authToken}`;
    }
    return req
};

const userAxiosInstance = createAxiosClient(baseURL);
userAxiosInstance.interceptors.request.use(async (req) => {
    const modifiedReq = attackToken(req, "userToken");
    return modifiedReq;
});

export {userAxiosInstance} 
// export const userApi = axios.create({ baseURL: `http://localhost:4000` });
