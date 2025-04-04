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
import PetMain from "./components/Pets/PetMain";
import AddMedicalExam from "./components/Pets/AddMedicalExam";


function App() {
  const dispatch = useDispatch();

  
  useEffect(() => {
    //FUNZIONE RICHIAMATA IN ACCOUNTAPI.Js PER LA GESTIONE DELL'AUTOLOGIN
    dispatch(AutoLogin());
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
        <Route path="/Pet/:id" element={<PetMain />} />
         <Route path="/MedicalExam/new/:id" element={<AddMedicalExam />} />
      </Routes>
      {/*qui ci metto il footer*/}
    </>
  );
}

export default App;
