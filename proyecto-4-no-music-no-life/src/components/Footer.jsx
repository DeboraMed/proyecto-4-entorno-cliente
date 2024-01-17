import Nav from 'react-bootstrap/Nav';

const Footer = () => {
    return (
        <>
        <footer className='footer fixed-bottom mt-auto py-3 bg-dark'>
        <div className="container">
        <Nav className="justify-content-center border-bottom pb-3 mb-3" activeKey="/">
            <Nav.Item>
            <Nav.Link className="text-light" href="/">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
            <Nav.Link className="text-light" href="/contacto">Contacto</Nav.Link>
            </Nav.Item>
            <Nav.Item>
            <Nav.Link className="text-light" href="/login">
                Login
            </Nav.Link>
            </Nav.Item>
            <Nav.Item>
            <Nav.Link className="text-light" href="/registro">
                Registrate
            </Nav.Link>
            </Nav.Item>
        </Nav>
        <p className="text-center text-light mt-4 mb-4">Debora Medina Rivero 2º DAW ©2024</p>
        </div>
      </footer>
      </>
    )
}

export default Footer