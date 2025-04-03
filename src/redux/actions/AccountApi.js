import { jwtDecode } from "jwt-decode";
const Url = `https://localhost:7054/api/Account/register`;

export const RegisterAccount = async (form) => {
    try {
        const response = await fetch(Url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });

        if (!response.ok) {
            throw new Error("Errore nella registrazione. Riprova.");
        } else {
            return await response.json();
        }
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};



const LoginUrl = `https://localhost:7054/api/Account/login`;

export const LoginAccount = async (form) => {

    try {
        const response = await fetch(LoginUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });
        if (response.status === 401) {
            console.log("non autorizzato!!!!!")
        }

        if (!response.ok) {
            throw new Error("Errore nel login. Riprova.");
        } else {
            const data = await response.json();
            const localItem = JSON.stringify(data);
            localStorage.setItem("token", localItem);
        }
    } catch (error) {
        console.error("Error:", error);
    }
};



export const SetToken = () => {
    return async (dispatch) => {
        let getToken = JSON.parse(localStorage.getItem("token"))
        const token = jwtDecode(getToken.token)
        console.log(token)
        dispatch({
            type: "SAVE_PROFILE",
            payload: {
                name: token.name,
                email: token.email,
                role: token.role,
                expire: token.exp,
                isExpired: false,
            },
        });
    }
}

export const Logout = () => {
    return async (dispatch) => {
        localStorage.removeItem("token")
        dispatch({
            type: "LOGOUT",
        });
    }
}

export const CheckToken = () => {
    return async (dispatch) => {
        dispatch({
            type: "CHECK_TOKEN",
        })
    }
}

export const AutoLogin = () => {
    return async (dispatch) => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const getToken = JSON.parse(token);
                const tokenJwt = jwtDecode(getToken.token);

                const currentTime = Math.floor(Date.now() / 1000);
                if (tokenJwt.exp > currentTime) {
                    // Il token è valido
                    dispatch({
                        type: "SAVE_PROFILE",
                        payload: {
                            name: tokenJwt.name,
                            email: tokenJwt.email,
                            role: tokenJwt.role,
                            expire: tokenJwt.exp,
                        },
                    });
                } else {
                    localStorage.removeItem("token");
                }
            } catch (error) {
                console.error("Errore nel decodificare il token", error);
                localStorage.removeItem("token");
            }
        }
    }
}



