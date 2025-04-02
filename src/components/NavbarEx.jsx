import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Logout } from '../api';
import { NavLink } from 'react-bootstrap';
import { useEffect } from 'react';

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
          <Nav className="me-auto">
            <Link to="/" className='nav-link' >Home</Link>
            {
              !profile.role &&
              <>
                <Link to="/Account/Register" className='nav-link'>Register</Link>
                <Link to="/Account/Login" className='nav-link'>Login</Link>
              </>
            }
            {
              profile.role &&
              <>
              
                {/* <Link to="/Account/Login" className='nav-link'>Logout</Link> */}
                <Nav.Link onClick={logoutAccount}>Logout</Nav.Link>
              </>
            }
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarEx;