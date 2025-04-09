import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';

function NavigationBar({token, onLogout}) {
    return (
        <Navbar expand="lg" className="bg-body-tertiary fixed-top">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {!token && <Nav.Link as={Link} to="/">Register</Nav.Link>}
                        {!token ? (
                            <Nav.Link as={Link} to="/login">Log in</Nav.Link>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/admin">Admin Dashboard</Nav.Link>
                                <Button
                                    variant="outline-danger"
                                    onClick={onLogout}
                                    style={{marginLeft: '10px'}}
                                >
                                    Log Out
                                </Button>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;