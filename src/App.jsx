import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from './components/Register';



function App() {

  return (
    <BrowserRouter>
    {/*qui ci metto la navbar*/}    
    
    <Routes>
      <Route path ='/' element = {<Register/>  }/>
    </Routes>
    {/*qui ci metto il footer*/}
    
  </BrowserRouter>
  )
}
export default App
