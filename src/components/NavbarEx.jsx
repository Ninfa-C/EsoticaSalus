import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-bootstrap';
import { useEffect } from 'react';
import { Logout } from '../redux/actions/AccountApi';

function NavbarEx() {
  const profile = useSelector(state => state.profile)
  const dispatch = useDispatch()
  const navigateTo = useNavigate()

const logoutAccount =() =>{
  dispatch(Logout())
  navigateTo("/Account/Login")
}

  useEffect(() => {
  }, [profile])

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">EsoticaSalus</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="w-100">
            <Link to="/" className='nav-link' >Home</Link>
            {(profile.role === "Admin" || profile.role === "Farmacista") && 
              <>
                  <Link to="/Pharmacy" className='nav-link'>Farmacia</Link>   
                {/* <Link to="/Products/Add" className='nav-link'>Aggiungi Prodotto</Link>                 */}
              </>
            }
            {
              profile.role?
              <Nav.Link onClick={logoutAccount} className='ms-auto'>Logout</Nav.Link> :
              <>
              <div className=' d-flex ms-auto'>
                <Link to="/Account/Register" className='nav-link'>Register</Link>
                <Link to="/Account/Login" className='nav-link'>Login</Link>
              </div>
              </>
            }

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarEx;