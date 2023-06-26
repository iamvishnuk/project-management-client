import { useNavigate } from "react-router-dom";

const logoutUser = () => {
    localStorage.removeItem("userToken")
    const navigate = useNavigate()
    navigate("/")
}

export default logoutUser