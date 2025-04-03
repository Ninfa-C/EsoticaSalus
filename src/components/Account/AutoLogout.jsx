import { useEffect } from 'react';
import { isTokenExpired } from './isTokenExpired';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export const AutoLogout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        const checkToken = setInterval(() => {
            const token = localStorage.getItem('token');
            if (token && isTokenExpired(token)) {
                localStorage.removeItem('token');
                dispatch({
                    type: "LOGOUT",
                });
                navigate("Account/Login")
            }
            //tempo in millisecondi sul quando vogiamo che esegua il controllo del token expirato
        }, 60000);
        return () => clearInterval(checkToken);
    }, []);
};
