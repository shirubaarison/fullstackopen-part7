import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'

import { Link } from 'react-router-dom'

const Menu = () => {
    const padding = {
        paddingRight: 5
    }

    return (
        <Navbar expand="lg" className="bg-primary" data-bs-theme='dark'>
            <Container>
                <Nav className="me-auto">
                    <Link className='nav-item link-item' to='/' style={padding}>home</Link>
                    <Link className='nav-item link-item' to='/users' style={padding}>users</Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Menu