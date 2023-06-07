import { useEffect } from "react"
import Login from "../Components/User/Login/Login"
import { useNavigate } from "react-router-dom"

function LoginPage() {
  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem("userToken")
    if(token) {
      navigate("/kanban-board");
    }
  },[])
  return <Login />
}

export default LoginPage