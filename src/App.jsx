/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import NavbarEx from "./components/NavbarEx";
import Login from "./components/Login";
import Homepage from "./components/Homepage";
import ProductAdd from "./components/Products/ProductsAdd";
import { AutoLogout } from "./components/Account/AutoLogout";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
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
  }, []);

  return (
    <>
      <AutoLogout />
      <NavbarEx />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Products/Add" element={<ProductAdd />} />
        <Route path="/Account/Register" element={<Register />} />
        <Route path="/Account/Login" element={<Login />} />
      </Routes>
      {/*qui ci metto il footer*/}
    </>
  );
}

export default App;
