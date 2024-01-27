import Nav from 'react-bootstrap/Nav';
import { NavLink, useNavigate } from 'react-router-dom'

const Footer = () => {
    return (
        <>
        <footer className='footer fixed-bottom mb-0 mt-auto py-1 bg-dark'>
        <div className="container">
        <Nav className="justify-content-center border-bottom pt-2 pb-3 mb-3" activeKey="/">
            <Nav.Item>
            <NavLink to="/" className="text-light text-decoration-none mx-3">
                Home
            </NavLink>
            </Nav.Item>
            <Nav.Item>
            <NavLink to="/contacto" className="text-light text-decoration-none mx-3">
                Contacto
            </NavLink>
            </Nav.Item>
            <Nav.Item>
            <NavLink to="/login" className="text-light text-decoration-none mx-3">
                Login
            </NavLink>
            </Nav.Item>
            <Nav.Item>
            <NavLink to="/registro" className="text-light text-decoration-none mx-3">
                Registrate
            </NavLink>
            </Nav.Item>
        </Nav>
        </div>
      </footer>
      </>
    )
}

export default Footer