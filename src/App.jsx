/* eslint-disable react-hooks/exhaustive-deps */
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from './components/Register';
import NavbarEx from './components/NavbarEx';
import Login from './components/Login';
import Homepage from './components/Homepage';
import ProductAdd from './components/Products/ProductsAdd';




function App() {
  return (
    <BrowserRouter>
    <NavbarEx/>    
    <Routes>
      <Route path ='/' element = {<Homepage/> }/>
      <Route path ='/Products/Add' element = {<ProductAdd/> }/>
      <Route path ='/Account/Register' element = {<Register/>  }/>
      <Route path ='/Account/Login' element = {<Login/>  }/>
    </Routes>
    {/*qui ci metto il footer*/}
    
  </BrowserRouter>
  )
}
export default App
