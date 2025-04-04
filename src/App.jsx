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
import SendOrder from "./components/Pharma/SendOrder";
import PetList from "./components/Pets/PetList";
//import { jwtDecode } from "jwt-decode";
import PetMain from "./components/Pets/PetMain";
import AddMedicalExam from "./components/Pets/AddMedicalExam";
import ProtectedRoute from "./components/ProtectedRoute";
import ManagePharma from "./components/Pharma/ManagePharma";
import UpdateProduct from "./components/Products/UpdateProduct";
import AddPet from "./components/Pets/AddPet";
import AddHospitalization from "./components/Pets/AddHospitalization";
import MedicalExamDetail from "./components/Pets/MedicalExamDetail";



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
        
        <Route path="/Pharmacy" element={<ProtectedRoute children={<PharmaHomepage />} allowedRoles={['Admin', 'Farmacista']} />} />
        <Route path="/Products/Add" element={<ProtectedRoute children={<ProductAdd />} allowedRoles={['Admin', 'Farmacista']} />} />
        <Route path="/Products/Update/:id" element={<ProtectedRoute children={<UpdateProduct />} allowedRoles={['Admin', 'Farmacista']} />} />
        <Route path="/Pharmacy/Order" element={<ProtectedRoute children={<SendOrder />} allowedRoles={['Admin', 'Farmacista']} />} />
        <Route path="/Pharmacy/Manage" element={<ProtectedRoute children={<ManagePharma />} allowedRoles={['Admin', 'Farmacista']} />} />

        <Route path="/Account/Register" element={<Register />} />
        <Route path="/Account/Login" element={<Login />} />

        <Route path="/Pet" element={<ProtectedRoute children={<PetList />} allowedRoles={['Admin', 'Veterinario']} />} />
        <Route path="/Pet/Add" element={<ProtectedRoute children={<AddPet />} allowedRoles={['Admin', 'Veterinario']} />} />
        <Route path="/Pet/:id" element={<ProtectedRoute children={<PetMain />} allowedRoles={['Admin', 'Veterinario']} />} />
        <Route path="/MedicalExam/new/:id" element={<ProtectedRoute children={<AddMedicalExam />} allowedRoles={['Admin', 'Veterinario']} />} />
        <Route path="/MedicalExam/:id" element={<ProtectedRoute children={<MedicalExamDetail /> } allowedRoles={['Admin', 'Veterinario']} />}  />
        <Route path="/Hospitalization/new/:id" element={<ProtectedRoute children={<AddHospitalization /> } allowedRoles={['Admin', 'Veterinario']} />}  />

      </Routes>
      {/*qui ci metto il footer*/}
    </>
  );
}

export default App;
