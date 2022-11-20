import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Button } from 'react-bootstrap';
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useLogoutUserMutation } from "../services/appApi"
import logo from "../assets/logo.png";

function Navigation() {
  const user = useSelector((state) => state.user);
  const [logoutUser] = useLogoutUserMutation()
  async function handleLogout(e) {
    e.preventDefault();
    await logoutUser(user);
    // redireccionar a la página de entrada
    window.location.replace("/");
  }
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <LinkContainer to="/">
            <Navbar.Brand>
                <img src={logo} style={{width: 50, height: 50}} />
            </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!user && (
            <LinkContainer to="/Login">
                <Nav.Link>Login</Nav.Link>
            </LinkContainer>
            )}
            <LinkContainer to="/Chat">
                <Nav.Link>Chat</Nav.Link>
            </LinkContainer>
            {user && (
            <NavDropdown title={
              <>
                <img src={user.picture} style={{width: 30, height: 30, marginRight: 10, objetctFit: "cover", borderRadius: "50%"}} />
                {user.name}
              </>
            } id="basic-nav-dropdown">
              <NavDropdown.Item>
                <Button variant="danger" onClick={handleLogout}>
                  Cerrar sesión
                </Button>
              </NavDropdown.Item>
            </NavDropdown>
            )};
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation