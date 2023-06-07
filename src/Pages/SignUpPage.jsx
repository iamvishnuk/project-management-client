import { useEffect} from "react";
import SignUp from "../Components/User/SignUp/SignUp";
import { useNavigate } from "react-router-dom";

function SignUpPage() {
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem("userToken")
        if(token) {
            navigate("/kanban-board");
        }
    },[])
    return <SignUp />;
}

export default SignUpPage;
