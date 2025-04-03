import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Logout } from "../redux/actions/AccountApi";

const ForceLogout = () =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(Logout(navigate));
    }

    handleLogout();
}

export default ForceLogout;