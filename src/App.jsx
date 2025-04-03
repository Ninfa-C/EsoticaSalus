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
import { AutoLogin } from "./redux/actions/AccountApi";
import PharmaHomepage from "./components/Pharma/PharmaHomepage";
//import { jwtDecode } from "jwt-decode";

function App() {
  const dispatch = useDispatch();

  
  useEffect(() => {
    dispatch(AutoLogin());
  }, []);



  return (
    <>
      <AutoLogout />
      <NavbarEx />
      <Routes>
        <Route path="/" element={<Homepage />} />        
        <Route path="/Pharmacy" element={<PharmaHomepage />} />
        <Route path="/Products/Add" element={<ProductAdd />} />
        <Route path="/Account/Register" element={<Register />} />
        <Route path="/Account/Login" element={<Login />} />
      </Routes>
      {/*qui ci metto il footer*/}
    </>
  );
}

export default App;
